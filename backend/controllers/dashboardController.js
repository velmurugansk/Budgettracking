const Income = require('../models/incomeModel');
const Expense = require('../models/expenseModel');
const moment = require('moment');
const { ObjectId } = require('mongodb')

const dashboardData = async (req, res) => {
    const userId = req.body.id;
    try {
        const currentmonthexpense = await Expense.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(moment().startOf('month').utc().toISOString()),
                        $lt: new Date(moment().endOf('day').utc().toISOString())
                    }
                }
            }
        ])

        const currentMonthincomes = await Income.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(moment().startOf('month').utc().toISOString()),
                        $lt: new Date(moment().endOf('day').utc().toISOString())
                    }
                }
            },
            {
                $group: { _id: null, total: { $sum: "$amount" } }
            }
        ])

        const currentMonthexpenseTotal = await Expense.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(moment().startOf('month').utc().toISOString()),
                        $lt: new Date(moment().endOf('day').utc().toISOString())
                    }
                }
            },
            {
                $group: { _id: null, total: { $sum: "$amount" } }
            }
        ])

        const threeMonthexpenseTotal = await Expense.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(moment().subtract(2, 'months').startOf('month').utc().toISOString()),
                        $lt: new Date(moment().endOf('day').utc().toISOString())
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    totalIncome: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    totalIncome: 1
                }
            },
            {
                $sort: {
                    year: -1,
                    month: -1
                }
            }

        ])

        const threeMonthincomeTotal = await Income.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(moment().subtract(2, 'months').startOf('month').utc().toISOString()),
                        $lt: new Date(moment().endOf('day').utc().toISOString())
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    totalIncome: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    totalIncome: 1
                }
            },
            {
                $sort: {
                    year: -1,
                    month: -1
                }
            }

        ])

        const remaingamount = currentMonthincomes[0].total - currentMonthexpenseTotal[0].total;

        const bothTransaction = await Income.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(moment().startOf('month').utc().toISOString()),
                        $lt: new Date(moment().endOf('day').utc().toISOString())
                    }
                }
            },
            {
                $addFields: {
                    type: "income"
                }
            },
            {
                $lookup: {
                    from: "expenses",
                    let: {
                        incomeUserId: "$userId",
                        incomeDate: "$date"
                    },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$userId", "$$incomeUserId"] }, // Match by userId
                                    { $gte: ["$date", new Date(moment().startOf('month').utc().toISOString())] }, // Match within the date range
                                    { $lte: ["$date", new Date(moment().endOf('day').utc().toISOString())] }
                                ]
                            }
                        }
                    }, {
                        $addFields: {
                            type: "expense"
                        }
                    }],
                    as: "matchedExpenses"
                }
            },
            {
                $unwind: {
                    path: "$matchedExpenses",
                    preserveNullAndEmptyArrays: true // Keep income documents even if no matching expense
                }
            },
            {
                $project: {
                    _id: 0, // Exclude _id from original income doc
                    userId: "$userId",
                    amount: {
                        $cond: {
                            if: { $eq: ["$type", "income"] },
                            then: "$amount",
                            else: "$matchedExpenses.amount"
                        }
                    },
                    category: {
                        $cond: {
                            if: { $eq: ["$type", "income"] },
                            then: "$category",
                            else: "$matchedExpenses.category"
                        }
                    },
                    date: {
                        $cond: {
                            if: { $eq: ["$type", "income"] },
                            then: "$date",
                            else: "$matchedExpenses.date"
                        }
                    },
                    source: {
                        $cond: {
                            if: { $eq: ["$type", "income"] },
                            then: "$source",
                            else: "$matchedExpenses.source"
                        }
                    },
                    type: {
                        $cond: {
                            if: { $eq: ["$type", "income"] },
                            then: "$type",
                            else: "$matchedExpenses.type"
                        }
                    }
                }
            },
            {
                $unionWith: {
                    coll: "expenses", // The collection to union with
                    pipeline: [
                        {
                            $match: {
                                userId: new ObjectId(userId),
                                date: { $gte: new Date(moment().startOf('month').utc().toISOString()), $lte: new Date(moment().endOf('day').utc().toISOString()) }
                            }
                        },
                        {
                            $addFields: {
                                type: "expense"
                            }
                        }
                    ]
                }
            },
            {
                $sort: {
                    date: 1 // Sort ascending by date
                }
            }
        ])

        
        res.status(200).json({
            "status": true, data: {
                currentmonthdata: {
                    income: currentMonthincomes[0].total,
                    expense: currentMonthexpenseTotal[0].total,
                    remaining: remaingamount
                },
                lastthreemonthdata: {
                    expense: threeMonthexpenseTotal,
                    income: threeMonthincomeTotal
                },
                currentmonthexpense: currentmonthexpense,
                combinedtransaction: bothTransaction
            }
        });

    } catch (error) {
        res.status(500).json({ "status": false, "message": error.message });
    }
}

module.exports = { dashboardData }
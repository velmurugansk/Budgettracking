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
            },
            {
                $sort: {
                    date: -1 
                }
            }            
        ])

        const currentmonthincome = await Income.aggregate([
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
                $sort: {
                    date: -1 
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
                        $gte: new Date(moment().subtract(1, 'months').startOf('month').utc().toISOString()),
                        $lt: new Date(moment().endOf('day').utc().toISOString())
                    }
                }
            },
            {
                $group: {
                    _id: {
                        category: "$category"
                    },
                    totalExpense: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id.category",
                    totalExpense: 1
                }
            },
            {
                $sort: {                    
                    category:1 
                }
            }

        ])

        const threeMonthincomeTotal = await Income.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    date: {
                        $gte: new Date(moment().subtract(1, 'months').startOf('month').utc().toISOString()),
                        $lt: new Date(moment().endOf('day').utc().toISOString())
                    }
                }
            },
            {
                $group: {
                    _id: {
                        source: "$source"
                    },
                    totalIncome: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    source: "$_id.source",
                    totalIncome: 1
                }
            },
            {
                $sort: {                    
                    source:1
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
                $group: {
                    _id: "$_id", // Group by the unique _id of each transaction
                    // Keep the first document for each _id found
                    doc: { $first: "$$ROOT" }
                }
            },
            // Replace the root document with the grouped document
            {
                $replaceRoot: { newRoot: "$doc" }
            },
            {
                $sort: {
                    date: -1 // Sort ascending by date
                }
            },
            {
                $limit: 7 // The new stage to limit the results
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
                combinedtransaction: bothTransaction,
                currentmonthincome:currentmonthincome
            }
        });

    } catch (error) {
        res.status(500).json({ "status": false, "message": error.message });
    }
}

module.exports = { dashboardData }
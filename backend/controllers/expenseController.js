const Expense = require('../models/expenseModel');
const { ObjectId } = require('mongodb')

const addExpense = async (req, res) => {
    const userId = req.id;
    const { icon, category, amount, date } = req.body;
    try {
        if (!category || !amount || !date) {
            return res.status(400).json({ "status": false, message: 'Source, Amount fields are required!' });
        }

        const newExpense = new Expense({ userId, icon, category, amount, date: new Date(date) });
        newExpense.save();
        res.status(200).json({ "status": true, message: 'Expense added successfully!' });
    } catch (error) {
        res.status(500).json({ "status": false, "message": error.message });
    }
}

const getallExpense = async (req, res) => {    
    const { startDate, endDate, id } = req.query;
    try {
        let expense;
        if (startDate && endDate) {
            expense = await Expense.find({
                userId: new ObjectId(id), date: {
                    $gte: startDate,
                    $lte: endDate
                }
            });
        } else {
            expense = await Expense.find({ userId: new ObjectId(id) }).sort({ date: -1 }).exec();
        }

        if (!expense) {
            return res.status(200).json({ "status": true, message: 'Expense not found!' });
        } else {
            res.status(200).json({ "status": true, data: expense });
        }
    } catch (error) {
        res.status(500).json({ "status": false, "message": error.message });
    }
}

const deleteExpense = async (req, res) => {    
    const id = req.body.id;
    try {
        const findData = await Expense.deleteOne({_id : new ObjectId(id)});        
        if(findData.deletedCount > 0) {
            res.status(200).json({ "status": true, message: 'Expense deleted Successfully!' })
        } else {
            res.status(404).json({ "status": false, message: 'Expense not found!' });
        }        
    } catch (error) {
        res.status(500).json({ "status": false, "message": error.message });
    }
}


module.exports = {addExpense, getallExpense, deleteExpense}
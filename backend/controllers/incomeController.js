const Income = require('../models/incomeModel');
const { ObjectId } = require('mongodb')

const addIncome = async(req, res) => {    
    const userId = req.id;
    const {icon, source, amount, date} = req.body;
    try {
        if(!source || !amount || !date) {
            return res.status(400).json({"status": false, message: 'Source, Amount fields are required!' });
        }

        const newIncome = new Income({userId,icon, source, amount, date: new Date(date)});
        newIncome.save();
        res.status(200).json({"status": true, message: 'Income added successfully!' });
    } catch (error) {
        res.status(500).json({"status": false,"message":error.message});
    }
}

const getallIncome = async(req, res) => {     
    console.log(req)   
    const userId = req.body.id;    
    const {startDate, endDate} = req.body;    
    try {
        let incomes;
        console.log(new ObjectId(userId), userId)
        if(startDate && endDate) {
            incomes = await Income.find({userId : new ObjectId(userId),date: {
                $gte: startDate, 
                $lte: endDate   
              }});
        } else {
            incomes = await Income.find({userId : new ObjectId(userId)}).sort({date: -1}).exec();
            console.log(incomes)
        }
                 
        if(!incomes){
            return res.status(200).json({"status": true, message: 'Income not found!' });
        } else {
            res.status(200).json({"status": true, data: incomes });
        }        
    } catch (error) {
        res.status(500).json({"status": false,"message":error.message});
    }
}

const deleteIncome = async (req, res) => {
    const id = req.body.id;
    try {
        const incomedelete = await Income.deleteOne({_id : new ObjectId(id)});
        if(incomedelete.deletedCount > 0) {
            res.status(200).json({"status": true, message: 'Income deleted Successfully!' });
        } else {
            res.status(404).json({ "status": false, message: 'Income not found!' });
        }        
    } catch (error) {
        res.status(500).json({"status": false,"message":error.message});
    }
}

module.exports = {addIncome, getallIncome, deleteIncome}
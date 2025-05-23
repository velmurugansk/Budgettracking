const { Schema, model, default: mongoose } = require('mongoose');

const expenseSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    icon: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: { type: Date, default: Date.now }
},{timestamps:true});

module.exports = mongoose.model('expense', expenseSchema)
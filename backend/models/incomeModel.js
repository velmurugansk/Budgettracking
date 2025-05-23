const {Schema, model, default: mongoose} = require('mongoose');

const incomeShema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        required: true
    },
    icon:{
        type: String
    },
    source:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date: {type: Date, default: Date.now }
}, {timestamps:true})

module.exports = mongoose.model('income', incomeShema)
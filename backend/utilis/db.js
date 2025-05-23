const mongoose = require('mongoose');

const dbConnection = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGOURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,       
        });
        console.log('DB Connected!');
    } catch(error) {
        console.log(error.message);
    }
} 

module.exports = {dbConnection}

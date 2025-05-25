const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const {dbConnection} = require('./utilis/db');
const path = require('path');

const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:5173', // Specify the frontend origin
    methods: ['GET', 'POST', 'DELETE'],       // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true
};

dbConnection()

app.use(cors(corsOptions));
app.use(bodyParser.json());
// app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!')
}); 

app.use('/api', routes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

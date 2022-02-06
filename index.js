const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/productmodel');
const Order = require('./models/ordermodel');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('MongoDB connection succeeded.');
    }
    else {
        console.log("Error in DB connection: " + err);
    }
}
);

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
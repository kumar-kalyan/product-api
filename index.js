const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
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
//register a new user
app.use('/api/auth', authRoutes);
//login an user 
app.use('/api/login', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
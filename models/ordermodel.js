const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
    {
        coustomerName: { type: String, required: true },
        orderAddress: { type: String, required: true },
        orderDetails: { type: String, required: true },
    })
module.exports = mongoose.model('Order', orderSchema)

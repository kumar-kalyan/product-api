const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number },
    color: { type: String },
    price: { type: Number, required: true },
    categories: { type: Array },
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema)

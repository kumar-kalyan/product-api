const router = require('express').Router();
const Product = require('../models/productmodel');
const { veryifyTokenAndAdmin } = require('./verifyToken');

//Create a new product
router.post('/', veryifyTokenAndAdmin, async (req, res) => {
    const newProduct = req.body;

    try {

        const createdProduct = await Product.create(newProduct);
        res.status(201).json(createdProduct);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//update a product by id 
router.put('/:id', veryifyTokenAndAdmin, async (req, res) => {
    const { id } = req.params;

    try {

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//delete a product by id 
router.delete('/:id', veryifyTokenAndAdmin, async (req, res) => {

    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'product deleted' });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//get product by id 
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).exec();
        res.status(200).json({ product });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}
)


//get all products 
router.get('/', async (req, res) => {
    try {
        const allProducts = await Product.find({}).exec();
        res.status(200).json({ allProducts });

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})




module.exports = router;

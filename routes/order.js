const router = require('express').Router();
const Order = require('../models/ordermodel');
const { verifyTokenAndAuthorization, veryifyTokenAndAdmin } = require('./verifyToken');
// Create a new order
router.post('/:id', verifyTokenAndAuthorization, async (req, res) => {
    const newOrder = req.body;
    try {
        const createdOrder = await Order.create(newOrder);
        res.status(201).json({ createdOrder });
    }
    catch (err) {
        res.status(500).json({ meaasge: err.message });
    }
})

//update an order 
router.put('/:id', veryifyTokenAndAdmin, async (req, res) => {
    const updateDetails = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updateDetails);
        res.status(200).json(updatedOrder)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//get all orders 
router.get('/', veryifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find({}).exec();
        res.status(200).json(orders)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//get user orders 
router.get('/users/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params
    try {
        const userOrders = await Order.find({ userId: id })
        const { _id, ...order } = userOrders
        res.status(200).json(order)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//delete user's order  
router.delete('/users/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params
    try {
        await Order.findByIdAndDelete(id);
        res.status(201).json({
            message: "Order calceled successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})

//delete any order 

router.delete('/:id', veryifyTokenAndAdmin, async (req, res) => {
    const { id } = req.params
    try {
        await Order.findByIdAndDelete(id);
        res.status(200).json({
            message: "Order Deleted successfuly by admin "
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.meaasge
        })
    }

})
module.exports = router
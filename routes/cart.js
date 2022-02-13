const router = require('express').Router()
const Cart = require('../models/cartmodel')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../routes/verifyToken')

//add products to cart 
router.post('/', verifyTokenAndAuthorization, async (req, res) => {
    const cartData = req.body
    try {
        const createdCart = await Cart.create(cartData)
        res.status(201).json(createdCart)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})
//update cart 
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    const data = req.body
    const { id } = req.params
    try {
        const updatedData = await Cart.findByIdAndUpdate(id, data)
        res.status(200).json(updatedData)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})
//user's cart 
router.get('/users/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params
    try {
        const cartDetails = await Cart.find({ userId: id })
        res.status(200).json(cartDetails)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//everyone's cart 

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const allCartDetails = await Cart.find({})
        res.status(200).json(allCartDetails)
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//delete any cart 
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    const { id } = req.params
    try {
        await Cart.findByIdAndDelete(id)
        res.status(200).jsona({
            message: "Cart deleted successfully "
        })
    }
    catch (err) {

    }

})

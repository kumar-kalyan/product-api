const { verifyTokenAndAuthorization, veryifyTokenAndAdmin } = require('./verifyToken');
const User = require('../models/usermodel');
const router = require('express').Router();
//update user
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        var updateduser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updateduser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})
//get user 
router.get('/:id', veryifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).exec();
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//delete user
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'user deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})
//get all users
router.get('/', veryifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find({}).exec();
        const { password, ...usersdata } = users;
        res.status(200).json({ usersdata });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//get user stats
router.get("/stats/all", veryifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
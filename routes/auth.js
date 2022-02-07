const router = require('express').Router();
const User = require('../models/usermodel');

//Register a new user
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const createdUser = await User.create({ username, password, email })
        res.status(201).json(createdUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

})
//Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        var user = await User.findOne({ username: username });
        if (!user || user.password !== password) {
            res.status(401).json({ message: "Invalid username or password" });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (err) {
        console.log(err);
    }

})



module.exports = router;
const router = require('express').Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

// Sign UP
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10); // Using async hashing
        const user = new User({ email, username, password: hashPassword });
        await user.save();
        res.status(200).json({ message: "SignUp Successful" });
    } catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Sign In
router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Please Sign Up first" });
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        const { password, ...others } = user._doc;
        res.status(200).json({ user: others });
    } catch (error) {
        console.error("Error in /signin:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Fishermen = require('../models/Fishermen');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

router.post('/register', async (req, res) => {
    try {
        const existingUser = await Fishermen.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const fisherman = await Fishermen.create({
            ...req.body,
            password: hashedPassword
        });
        res.json(fisherman);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Fishermen.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Password is incorrect" });

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '15m' });

        const refreshToken = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' });

        res.json({
            message: "Success",
            accessToken,
            refreshToken
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

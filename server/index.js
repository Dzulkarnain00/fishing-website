const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const RecordModel = require('./models/Record');
const FishermenModel = require('./models/Fishermen');

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose.connect("mongodb://localhost:27017/NEW")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await FishermenModel.findOne({ email });
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

        res.json({ message: "Success", email: user.email, accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await FishermenModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await FishermenModel.create({ email, password: hashedPassword });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/records', async (req, res) => {
    const { userEmail } = req.query;
    const records = await RecordModel.find({ userEmail });
    res.json(records);
});

app.post('/records', async (req, res) => {
    try {
        const record = await RecordModel.create(req.body);
        res.json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/records/:id', async (req, res) => {
    try {
        const updated = await RecordModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/records/:id', async (req, res) => {
    try {
        await RecordModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(3001, () => console.log("Server running on port 3001"));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FishermenModel = require('./models/Fishermen');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Fishermen")

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    FishermenModel.findOne({email: email})
    .then(user => {
        if(user) {
            if (user.password === password) {
                res.json("Success")
            } else {
                res.json({message: "Password is incorrect"})
            }
        }else {
            res.json({message: "User not found"})
        }
    })
})

app.post('/register', (req, res) => {
    FishermenModel.create(req.body)
        .then(fisherman => res.json(fisherman))
        .catch(err => console.log(err))
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})
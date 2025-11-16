const mongoose = require('mongoose');

const FishermenSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const FishermenModel = mongoose.model("Fishermen", FishermenSchema);
module.exports = FishermenModel;
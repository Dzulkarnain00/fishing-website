const mongoose = require('mongoose');

const FishermenSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const FishermenModel = mongoose.model('fisherman', FishermenSchema);
module.exports = FishermenModel
const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    date: String,
    fishType: String,
    weightLength: String,
    status: String
});

const RecordModel = mongoose.model("record", RecordSchema);
module.exports = RecordModel;

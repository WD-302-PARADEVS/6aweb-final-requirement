const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    logoUrl: { type: String, required: true },
    fbUrl: { type: String, required: true }
});

module.exports = mongoose.model('Shelter', shelterSchema);

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Model for MongoDB

// POST route to save form data
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, inquiryType, message } = req.body;

        // Create new Contact entry
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            inquiryType,
            message
        });

        await newContact.save(); // Save to MongoDB
        res.status(201).json({ message: 'Contact saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save contact' });
    }
});

module.exports = router;

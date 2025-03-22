const express = require('express');
const router = express.Router();
const Shelter = require('../models/shelter');


router.get('/', async (req, res) => {
    try {
        const shelters = await Shelter.find();
        res.json(shelters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { name, location, description, logoUrl, fbUrl } = req.body;

    if (!name || !location || !description || !logoUrl || !fbUrl) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const shelter = new Shelter({
            name,
            location,
            description,
            logoUrl,
            fbUrl
        });

        const newShelter = await shelter.save();
        res.status(201).json(newShelter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Shelter.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Shelter deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedShelter = await Shelter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedShelter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

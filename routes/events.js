const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Create a new event
router.post('/', async (req, res) => {
  try {
    const { name, description, date, location, category } = req.body;
    const event = new Event({
      name,
      description,
      date,
      location,
      category,
      createdBy: req.user.id
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get event specific to the user
router.get('/created', async (req, res) => {
  try {
    const user = req.user;
    const id = user._id;
 
    
    const events = await Event.find({createdBy: id}).populate('createdBy', 'username');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get a single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById({
      _id: req.params.id
      }).populate('createdBy', 'username');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});










module.exports = router;
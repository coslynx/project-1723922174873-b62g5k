const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db');

// Get all workouts for a specific user
router.get('/', async (req, res) => {
  const db = await getDb();
  const userId = req.session.user.id;

  try {
    const workouts = await db
      .collection('workouts')
      .find({ userId: ObjectId(userId) })
      .sort({ date: -1 })
      .toArray();

    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Create a new workout for a user
router.post('/', async (req, res) => {
  const db = await getDb();
  const userId = req.session.user.id;
  const newWorkout = req.body;

  try {
    newWorkout.userId = ObjectId(userId);
    newWorkout.date = new Date(newWorkout.date);

    const result = await db.collection('workouts').insertOne(newWorkout);

    res.status(201).json({ message: 'Workout added successfully', id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update an existing workout
router.put('/:workoutId', async (req, res) => {
  const db = await getDb();
  const workoutId = req.params.workoutId;
  const updatedWorkout = req.body;

  try {
    const result = await db.collection('workouts').updateOne(
      { _id: ObjectId(workoutId) },
      { $set: updatedWorkout }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Workout updated successfully' });
    } else {
      res.status(404).json({ error: 'Workout not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete a workout
router.delete('/:workoutId', async (req, res) => {
  const db = await getDb();
  const workoutId = req.params.workoutId;

  try {
    const result = await db.collection('workouts').deleteOne({ _id: ObjectId(workoutId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Workout deleted successfully' });
    } else {
      res.status(404).json({ error: 'Workout not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
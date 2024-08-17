const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db');

// Get all goals for a specific user
router.get('/', async (req, res) => {
  const db = await getDb();
  const userId = req.session.user.id;

  try {
    const goals = await db
      .collection('goals')
      .find({ userId: ObjectId(userId) })
      .toArray();

    res.status(200).json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Create a new goal for a user
router.post('/', async (req, res) => {
  const db = await getDb();
  const userId = req.session.user.id;
  const newGoal = req.body;

  try {
    newGoal.userId = ObjectId(userId);
    newGoal.deadline = new Date(newGoal.deadline);

    const result = await db.collection('goals').insertOne(newGoal);

    res.status(201).json({ message: 'Goal added successfully', id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update an existing goal
router.put('/:goalId', async (req, res) => {
  const db = await getDb();
  const goalId = req.params.goalId;
  const updatedGoal = req.body;

  try {
    const result = await db.collection('goals').updateOne(
      { _id: ObjectId(goalId) },
      { $set: updatedGoal }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Goal updated successfully' });
    } else {
      res.status(404).json({ error: 'Goal not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete a goal
router.delete('/:goalId', async (req, res) => {
  const db = await getDb();
  const goalId = req.params.goalId;

  try {
    const result = await db.collection('goals').deleteOne({ _id: ObjectId(goalId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Goal deleted successfully' });
    } else {
      res.status(404).json({ error: 'Goal not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
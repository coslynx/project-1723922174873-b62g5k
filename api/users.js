const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db');

// Get user information by ID
router.get('/:userId', async (req, res) => {
  const db = await getDb();
  const userId = req.params.userId;

  try {
    const user = await db.collection('users').findOne({ _id: ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch the user's goals and workouts
    const goals = await db
      .collection('goals')
      .find({ userId: ObjectId(userId) })
      .toArray();

    const workouts = await db
      .collection('workouts')
      .find({ userId: ObjectId(userId) })
      .sort({ date: -1 })
      .toArray();

    // Construct the response object
    const responseUser = {
      ...user,
      goals,
      workouts,
    };

    res.status(200).json(responseUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update user information
router.put('/:userId', async (req, res) => {
  const db = await getDb();
  const userId = req.params.userId;
  const updatedUser = req.body;

  try {
    const result = await db.collection('users').updateOne(
      { _id: ObjectId(userId) },
      { $set: updatedUser }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
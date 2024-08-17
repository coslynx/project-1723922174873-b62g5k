const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db');

// Get the user's activity feed
router.get('/feed', async (req, res) => {
  const db = await getDb();
  const userId = req.session.user.id;

  try {
    // Find the current user's following list
    const user = await db.collection('users').findOne({ _id: ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch the activity from the users the current user follows
    const activity = await Promise.all(
      user.following.map(async (followingId) => {
        const followedUser = await db
          .collection('users')
          .findOne({ _id: ObjectId(followingId) });

        if (!followedUser) {
          return null;
        }

        // Fetch recent workouts for the followed user
        const workouts = await db
          .collection('workouts')
          .find({ userId: followingId })
          .sort({ date: -1 })
          .limit(5)
          .toArray();

        return workouts.map((workout) => ({
          userId: followingId,
          userName: followedUser.name,
          type: workout.type,
          date: workout.date,
        }));
      })
    );

    // Flatten the activity array and sort by date
    const flattenedActivity = activity.flat().sort((a, b) => b.date - a.date);

    res.status(200).json(flattenedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Follow a user
router.post('/follow/:userId', async (req, res) => {
  const db = await getDb();
  const userId = req.session.user.id;
  const followingId = req.params.userId;

  try {
    // Update the current user's following list
    await db.collection('users').updateOne(
      { _id: ObjectId(userId) },
      { $addToSet: { following: ObjectId(followingId) } }
    );

    // Update the followed user's followers list
    await db.collection('users').updateOne(
      { _id: ObjectId(followingId) },
      { $addToSet: { followers: ObjectId(userId) } }
    );

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Unfollow a user
router.delete('/follow/:userId', async (req, res) => {
  const db = await getDb();
  const userId = req.session.user.id;
  const followingId = req.params.userId;

  try {
    // Update the current user's following list
    await db.collection('users').updateOne(
      { _id: ObjectId(userId) },
      { $pull: { following: ObjectId(followingId) } }
    );

    // Update the followed user's followers list
    await db.collection('users').updateOne(
      { _id: ObjectId(followingId) },
      { $pull: { followers: ObjectId(userId) } }
    );

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
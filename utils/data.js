const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const { validateEmail, validatePassword, validateGoal, validateWorkout } = require('./validation');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function getDb() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.MONGODB_DB);
  }
  return db;
}

async function createUser(userData) {
  try {
    validateEmail(userData.email);
    validatePassword(userData.password);

    const db = await getDb();
    const result = await db.collection('users').insertOne(userData);
    return result.insertedId;
  } catch (error) {
    throw error;
  }
}

async function getUser(userId) {
  try {
    const db = await getDb();
    const user = await db.collection('users').findOne({ _id: ObjectId(userId) });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(userId, updatedUserData) {
  try {
    const db = await getDb();
    const result = await db.collection('users').updateOne(
      { _id: ObjectId(userId) },
      { $set: updatedUserData }
    );

    if (result.modifiedCount === 0) {
      throw new Error('User not found');
    }
  } catch (error) {
    throw error;
  }
}

async function createGoal(goalData) {
  try {
    validateGoal(goalData);

    const db = await getDb();
    const result = await db.collection('goals').insertOne(goalData);
    return result.insertedId;
  } catch (error) {
    throw error;
  }
}

async function getGoals(userId) {
  try {
    const db = await getDb();
    const goals = await db
      .collection('goals')
      .find({ userId: ObjectId(userId) })
      .toArray();
    return goals;
  } catch (error) {
    throw error;
  }
}

async function updateGoal(goalId, updatedGoalData) {
  try {
    validateGoal(updatedGoalData);

    const db = await getDb();
    const result = await db.collection('goals').updateOne(
      { _id: ObjectId(goalId) },
      { $set: updatedGoalData }
    );

    if (result.modifiedCount === 0) {
      throw new Error('Goal not found');
    }
  } catch (error) {
    throw error;
  }
}

async function deleteGoal(goalId) {
  try {
    const db = await getDb();
    const result = await db.collection('goals').deleteOne({ _id: ObjectId(goalId) });

    if (result.deletedCount === 0) {
      throw new Error('Goal not found');
    }
  } catch (error) {
    throw error;
  }
}

async function createWorkout(workoutData) {
  try {
    validateWorkout(workoutData);

    const db = await getDb();
    const result = await db.collection('workouts').insertOne(workoutData);
    return result.insertedId;
  } catch (error) {
    throw error;
  }
}

async function getWorkouts(userId) {
  try {
    const db = await getDb();
    const workouts = await db
      .collection('workouts')
      .find({ userId: ObjectId(userId) })
      .sort({ date: -1 })
      .toArray();
    return workouts;
  } catch (error) {
    throw error;
  }
}

async function updateWorkout(workoutId, updatedWorkoutData) {
  try {
    validateWorkout(updatedWorkoutData);

    const db = await getDb();
    const result = await db.collection('workouts').updateOne(
      { _id: ObjectId(workoutId) },
      { $set: updatedWorkoutData }
    );

    if (result.modifiedCount === 0) {
      throw new Error('Workout not found');
    }
  } catch (error) {
    throw error;
  }
}

async function deleteWorkout(workoutId) {
  try {
    const db = await getDb();
    const result = await db.collection('workouts').deleteOne({ _id: ObjectId(workoutId) });

    if (result.deletedCount === 0) {
      throw new Error('Workout not found');
    }
  } catch (error) {
    throw error;
  }
}

async function followUser(userId, followingId) {
  try {
    const db = await getDb();

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
  } catch (error) {
    throw error;
  }
}

async function unfollowUser(userId, followingId) {
  try {
    const db = await getDb();

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
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getDb,
  createUser,
  getUser,
  updateUser,
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
  followUser,
  unfollowUser,
};
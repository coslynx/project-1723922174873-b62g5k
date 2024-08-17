const { isEmail, isStrongPassword } = require('validator');

const validateEmail = (email) => {
  if (!isEmail(email)) {
    throw new Error('Invalid email format');
  }
};

const validatePassword = (password) => {
  if (!isStrongPassword(password)) {
    throw new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  }
};

const validateGoal = (goal) => {
  if (!goal.name) {
    throw new Error('Goal name is required');
  }
  if (!goal.type) {
    throw new Error('Goal type is required');
  }
  if (!goal.target) {
    throw new Error('Goal target is required');
  }
  if (!goal.deadline) {
    throw new Error('Goal deadline is required');
  }
  if (new Date(goal.deadline) <= new Date()) {
    throw new Error('Goal deadline must be in the future');
  }
};

const validateWorkout = (workout) => {
  if (!workout.date) {
    throw new Error('Workout date is required');
  }
  if (!workout.type) {
    throw new Error('Workout type is required');
  }
  if (!workout.duration) {
    throw new Error('Workout duration is required');
  }
  if (!workout.intensity) {
    throw new Error('Workout intensity is required');
  }
  if (workout.type === 'Strength Training' && !workout.weight) {
    throw new Error('Weight is required for Strength Training workouts');
  }
  if (!workout.caloriesBurned) {
    throw new Error('Calories burned is required');
  }
};

module.exports = {
  validateEmail,
  validatePassword,
  validateGoal,
  validateWorkout,
};
const { getDb } = require('./data');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { validateEmail, validatePassword } = require('./validation');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

async function generateToken(userId) {
  try {
    const token = jwt.sign({ userId }, secret, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw error;
  }
}

async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.userId;
  } catch (error) {
    throw error;
  }
}

async function authenticateUser(email, password) {
  try {
    validateEmail(email);
    validatePassword(password);

    const db = await getDb();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const token = await generateToken(user._id);
    return { userId: user._id, token };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  generateToken,
  verifyToken,
  authenticateUser,
};
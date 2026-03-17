const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersPath = path.join(__dirname, '../models/users.json');
const JWT_SECRET = 'bookappjwtsecret';

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
  const users = JSON.parse(await fs.readFile(usersPath, 'utf-8'));
  if (users.find(u => u.username === username)) return res.status(409).json({ message: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password: hash });
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(await fs.readFile(usersPath, 'utf-8'));
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  req.session.user = username;
  res.json({ message: 'Login successful', token });
});

module.exports = router;

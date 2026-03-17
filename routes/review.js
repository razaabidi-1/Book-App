const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');

const booksPath = path.join(__dirname, '../models/books.json');
const JWT_SECRET = 'bookappjwtsecret';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Add or update review
router.put('/:isbn/review', authenticateToken, async (req, res) => {
  const { review } = req.body;
  const username = req.user.username;
  const data = await fs.readFile(booksPath, 'utf-8');
  const books = JSON.parse(data);
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });
  book.reviews[username] = review;
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  res.json({ message: 'Review added/updated', reviews: book.reviews });
});

// Delete review
router.delete('/:isbn/review', authenticateToken, async (req, res) => {
  const username = req.user.username;
  const data = await fs.readFile(booksPath, 'utf-8');
  const books = JSON.parse(data);
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (!book.reviews[username]) return res.status(404).json({ message: 'Review not found' });
  delete book.reviews[username];
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  res.json({ message: 'Review deleted' });
});

module.exports = router;

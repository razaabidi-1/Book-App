const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const booksPath = path.join(__dirname, '../models/books.json');

// Get all books
router.get('/', async (req, res) => {
  const data = await fs.readFile(booksPath, 'utf-8');
  res.json(JSON.parse(data));
});

// Get book by ISBN
router.get('/isbn/:isbn', async (req, res) => {
  const data = await fs.readFile(booksPath, 'utf-8');
  const books = JSON.parse(data);
  const book = books[req.params.isbn];
  if (book) res.json(book);
  else res.status(404).json({ message: 'Book not found' });
});

// Get books by author
router.get('/author/:author', async (req, res) => {
  const data = await fs.readFile(booksPath, 'utf-8');
  const books = JSON.parse(data);
  const result = Object.values(books).filter(b => b.author.toLowerCase() === req.params.author.toLowerCase());
  res.json(result);
});

// Get books by title
router.get('/title/:title', async (req, res) => {
  const data = await fs.readFile(booksPath, 'utf-8');
  const books = JSON.parse(data);
  const result = Object.values(books).filter(b => b.title.toLowerCase() === req.params.title.toLowerCase());
  res.json(result);
});

// Get book reviews
router.get('/:isbn/review', async (req, res) => {
  const data = await fs.readFile(booksPath, 'utf-8');
  const books = JSON.parse(data);
  const book = books[req.params.isbn];
  if (book) res.json(book.reviews);
  else res.status(404).json({ message: 'Book not found' });
});

module.exports = router;

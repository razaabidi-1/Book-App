// general.js
// Node.js script using Axios and async/await for book operations
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/books';

// 1. Get all books
async function getAllBooks() {
  const res = await axios.get(BASE_URL);
  return res.data;
}

// 2. Get book by ISBN
async function getBookByISBN(isbn) {
  const res = await axios.get(`${BASE_URL}/isbn/${isbn}`);
  return res.data;
}

// 3. Get books by author
async function getBooksByAuthor(author) {
  const res = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
  return res.data;
}

// 4. Get books by title
async function getBooksByTitle(title) {
  const res = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
  return res.data;
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};

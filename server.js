const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const reviewRoutes = require('./routes/review');

const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: 'bookappsecret',
  resave: false,
  saveUninitialized: true
}));


app.use('/user', userRoutes);
app.use('/books', bookRoutes);
app.use('/books', reviewRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Book Review API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

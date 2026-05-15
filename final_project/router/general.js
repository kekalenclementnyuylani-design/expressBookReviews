const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 1 — Get all books
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Task 2 — Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  }
  return res.status(404).json({ message: "Book not found" });
});

// Task 3 — Get books by author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const result = Object.values(books).filter(b => b.author === author);
  if (result.length > 0) {
    return res.status(200).json(result);
  }
  return res.status(404).json({ message: "No books found for this author" });
});

// Task 4 — Get books by title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const result = Object.values(books).filter(b => b.title === title);
  if (result.length > 0) {
    return res.status(200).json(result);
  }
  return res.status(404).json({ message: "No books found with this title" });
});

// Task 5 — Get reviews by ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({ message: "No reviews found for this book" });
});

// Task 11 — Get all books (async/await)
public_users.get('/async/books', async (req, res) => {
  try {
    const getBooks = () => new Promise((resolve) => resolve(books));
    const data = await getBooks();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Task 12 — Get book by ISBN (async/await)
public_users.get('/async/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const getBook = (id) => new Promise((resolve, reject) => {
      if (books[id]) resolve(books[id]);
      else reject(new Error("Book not found"));
    });
    const data = await getBook(isbn);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

// Task 13 — Get books by author (async/await)
public_users.get('/async/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const getByAuthor = (a) => new Promise((resolve, reject) => {
      const result = Object.values(books).filter(b => b.author === a);
      if (result.length > 0) resolve(result);
      else reject(new Error("No books found for this author"));
    });
    const data = await getByAuthor(author);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

// Task 14 — Get books by title (async/await)
public_users.get('/async/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const getByTitle = (t) => new Promise((resolve, reject) => {
      const result = Object.values(books).filter(b => b.title === t);
      if (result.length > 0) resolve(result);
      else reject(new Error("No books found with this title"));
    });
    const data = await getByTitle(title);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

module.exports.general = public_users;
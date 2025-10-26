// controllers/book-controller.js
const Book = require('../models/book');

const addBook = async (req, res) => {
  try {
    console.log('Received book data:', req.body);
    const book = new Book({ ...req.body });
    console.log('Book before save:', book);
    await book.save();
    console.log('Book after save:', book);
    return res.status(201).json({ success: true, book });
  } catch (err) {
    console.log('Error adding book:', err);
    return res.status(400).json({
      success: false,
      error: err.message || 'Failed to add book.',
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const bookList = await Book.find({});
    return res.status(200).json(bookList);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { addBook, getAllBooks };

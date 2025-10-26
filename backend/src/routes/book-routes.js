const express = require('express');
const router = express.Router();
const bookController= require('../controllers/book-controller');
const authMiddleware = require('../middleware/AuthMiddleware');
const librarianMiddleware = require('../middleware/LibrarianMiddleware');

router.post('/add',authMiddleware,librarianMiddleware,bookController.addBook);
router.post('/all',authMiddleware,bookController.getAllBooks)
module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllIssuedBooks, issueBook, returnBook, studentIssueBook, getMyBorrowedBooks } = require('../controllers/issued-controller');
const authMiddleware = require('../middleware/AuthMiddleware');
const librarianMiddleware = require('../middleware/LibrarianMiddleware');

router.get('/test', async (req, res) => {
    try {
        const IssuedBook = require('../models/issued-book');
        const count = await IssuedBook.countDocuments({});
        const sample = await IssuedBook.findOne({});
        res.json({ 
            message: 'Server is running', 
            timestamp: new Date(),
            totalRecords: count,
            sampleRecord: sample
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Librarian routes
router.get('/all', authMiddleware, librarianMiddleware, getAllIssuedBooks);
router.post('/issue', authMiddleware, librarianMiddleware, issueBook);
router.post('/return', authMiddleware, librarianMiddleware, returnBook);

// Student routes
router.post('/student-issue', authMiddleware, studentIssueBook);
router.get('/my-books', authMiddleware, getMyBorrowedBooks);

module.exports = router;
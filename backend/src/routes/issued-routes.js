const express = require('express');
const router = express.Router();
const { getAllIssuedBooks, issueBook, returnBook } = require('../controllers/issued-controller');

router.get('/test', (req, res) => {
    console.log('Test endpoint hit');
    res.json({ message: 'Server is running', timestamp: new Date() });
});

router.get('/all', getAllIssuedBooks);
router.post('/issue', issueBook);
router.post('/return', returnBook);

module.exports = router;
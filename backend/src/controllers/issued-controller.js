const User = require('../models/user');
const Book = require('../models/book');
const IssuedBook = require('../models/issued-book');

// Get all issued books
const getAllIssuedBooks = async (req, res) => {
    try {
        await IssuedBook.updateMany(
            { dueDate: { $lt: new Date() }, status: 'issued' },
            { status: 'overdue' }
        );

        const issuedBooks = await IssuedBook.find({
            status: { $in: ['issued', 'overdue'] }
        })
        .populate('student', 'firstName lastName email')
        .populate('book', 'title author isbn')
        .sort({ issueDate: -1 });

        const formattedBooks = issuedBooks.map(issued => ({
            id: issued._id,
            student: issued.student ? {
                name: `${issued.student.firstName} ${issued.student.lastName}`,
                email: issued.student.email,
                id: issued.student._id
            } : null,
            book: issued.book ? {
                title: issued.book.title,
                author: issued.book.author,
                isbn: issued.book.isbn
            } : null,
            issueDate: issued.issueDate.toISOString().split('T')[0],
            dueDate: issued.dueDate.toISOString().split('T')[0],
            status: issued.status
        }));

        res.json(formattedBooks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Issue a book to a student
const issueBook = async (req, res) => {
    try {
        const { studentId, bookId } = req.body;

        const student = await User.findById(studentId);
        if (!student || student.role !== 'user') {
            return res.status(404).json({ message: 'Student not found' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.issuedQuantity >= book.totalQuantity) {
            return res.status(400).json({ message: 'Book not available' });
        }

        const issuedBook = new IssuedBook({
            student: studentId,
            book: bookId,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: 'issued'
        });

        await issuedBook.save();
        book.issuedQuantity += 1;
        await book.save();

        res.status(201).json({ message: 'Book issued successfully' });
    } catch (error) {
        console.error('Issue book error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Return a book
const returnBook = async (req, res) => {
    try {
        const { issueId } = req.body;

        const issuedBook = await IssuedBook.findById(issueId).populate('book');
        if (!issuedBook) {
            return res.status(404).json({ message: 'Issued book record not found' });
        }

        issuedBook.status = 'returned';
        issuedBook.returnDate = new Date();
        await issuedBook.save();
        
        const book = await Book.findById(issuedBook.book._id);
        if (book && book.issuedQuantity > 0) {
            book.issuedQuantity -= 1;
            await book.save();
        }

        res.json({ message: 'Book returned successfully' });
    } catch (error) {
        console.error('Return book error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Student issues a book for themselves
const studentIssueBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        const studentId = req.user.userId || req.user._id || req.user.id;
        
        console.log('Student issuing book - User:', req.user, 'Student ID:', studentId);

        if (!studentId) {
            return res.status(400).json({ message: 'User ID not found in token' });
        }

        // Check if student already has this book issued
        const existingIssue = await IssuedBook.findOne({
            student: studentId,
            book: bookId,
            status: { $in: ['issued', 'overdue'] }
        });

        if (existingIssue) {
            return res.status(400).json({ message: 'You have already issued this book' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.issuedQuantity >= book.totalQuantity) {
            return res.status(400).json({ message: 'Book not available' });
        }

        const issuedBook = new IssuedBook({
            student: studentId,
            book: bookId,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: 'issued'
        });

        await issuedBook.save();
        book.issuedQuantity += 1;
        await book.save();

        res.status(201).json({ message: 'Book issued successfully' });
    } catch (error) {
        console.error('Student issue book error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get student's borrowed books
const getMyBorrowedBooks = async (req, res) => {
    try {
        console.log('User from token:', req.user);
        const studentId = req.user.userId || req.user._id || req.user.id;
        console.log('Student ID:', studentId);

        if (!studentId) {
            return res.status(400).json({ message: 'User ID not found in token' });
        }

        const borrowedBooks = await IssuedBook.find({
            student: studentId,
            status: { $in: ['issued', 'overdue'] }
        })
        .populate('book', 'title author isbn')
        .sort({ issueDate: -1 });

        console.log('Found borrowed books:', borrowedBooks.length);

        const formattedBooks = borrowedBooks.map(issued => ({
            id: issued._id,
            book: {
                title: issued.book.title,
                author: issued.book.author,
                isbn: issued.book.isbn
            },
            issueDate: issued.issueDate.toISOString().split('T')[0],
            dueDate: issued.dueDate.toISOString().split('T')[0],
            status: issued.status
        }));

        res.json(formattedBooks);
    } catch (error) {
        console.error('Get borrowed books error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getAllIssuedBooks,
    issueBook,
    returnBook,
    studentIssueBook,
    getMyBorrowedBooks
};
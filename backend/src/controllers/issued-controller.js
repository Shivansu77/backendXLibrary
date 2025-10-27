const User = require('../models/user');
const Book = require('../models/book');
const IssuedBook = require('../models/issued-book');

// Get all issued books
const getAllIssuedBooks = async (req, res) => {
    console.log('FUNCTION CALLED: getAllIssuedBooks');
    try {
        console.log('=== Getting all issued books ===');
        
        // First get ALL issued books without any filters
        const allIssuedBooks = await IssuedBook.find({});
        console.log('ALL issued books count:', allIssuedBooks.length);
        console.log('ALL issued books:', JSON.stringify(allIssuedBooks, null, 2));
        
        // Get issued books with status filter
        const rawIssuedBooks = await IssuedBook.find({ 
            status: { $in: ['issued', 'overdue'] }
        });
        console.log('Filtered issued books count:', rawIssuedBooks.length);
        
        // Now try with populate
        const issuedBooks = await IssuedBook.find({ 
            status: { $in: ['issued', 'overdue'] }
        })
        .populate('student', 'firstName lastName email')
        .populate('book', 'title author isbn')
        .sort({ issueDate: -1 });
        
        console.log('Populated issued books count:', issuedBooks.length);
        console.log('Populated data:', JSON.stringify(issuedBooks, null, 2));

        const formattedBooks = [];
        
        for (const issued of issuedBooks) {
            console.log('Processing issued book:', issued._id);
            console.log('Student data:', issued.student);
            console.log('Book data:', issued.book);
            
            // If populate failed, manually fetch student and book
            let studentData = issued.student;
            let bookData = issued.book;
            
            if (!studentData && issued.student) {
                try {
                    studentData = await User.findById(issued.student);
                } catch (err) {
                    console.log('Failed to fetch student:', err);
                }
            }
            
            if (!bookData && issued.book) {
                try {
                    bookData = await Book.findById(issued.book);
                } catch (err) {
                    console.log('Failed to fetch book:', err);
                }
            }
            
            formattedBooks.push({
                id: issued._id,
                student: {
                    name: studentData ? `${studentData.firstName} ${studentData.lastName}` : 'Unknown Student',
                    email: studentData ? studentData.email : 'No email',
                    id: studentData ? studentData._id : issued.student || 'No ID'
                },
                book: {
                    title: bookData ? bookData.title : 'Unknown Book',
                    author: bookData ? bookData.author : 'Unknown Author',
                    isbn: bookData ? bookData.isbn : 'No ISBN'
                },
                issueDate: issued.issueDate.toISOString().split('T')[0],
                dueDate: issued.dueDate.toISOString().split('T')[0],
                status: issued.status
            });
        }
        
        console.log('Final formatted books:', JSON.stringify(formattedBooks, null, 2));
        console.log('Sending response with', formattedBooks.length, 'books');
        res.json(formattedBooks);
    } catch (error) {
        console.error('Get issued books error:', error);
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

module.exports = {
    getAllIssuedBooks,
    issueBook,
    returnBook
};
const mongoose = require('mongoose');

const issuedBookSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['issued', 'returned', 'overdue'],
        default: 'issued'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('IssuedBook', issuedBookSchema, 'issuedbooks');
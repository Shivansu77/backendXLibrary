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

// Update status to overdue if past due date
issuedBookSchema.pre('find', function() {
    const now = new Date();
    this.updateMany(
        { 
            dueDate: { $lt: now }, 
            status: 'issued' 
        },
        { status: 'overdue' }
    );
});

module.exports = mongoose.model('IssuedBook', issuedBookSchema);
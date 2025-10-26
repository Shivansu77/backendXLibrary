// models/Book.js
const { model, Schema } = require('mongoose');

// Book schema: for library or bookstore management
const BookSchema = new Schema({
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    publicationDate: {
        type: Date,
    },
    genre: {
        type: String,
        trim: true,
    },
    totalQuantity: {
        type: Number,
        min: 0,
        default: 1,
    },
    issuedQuantity: {
        type: Number,
        min: 0,
        default: 0,
    },
    price: {
        type: Number,
        min: 1,
        required: true,
    },
}, {
    timestamps: true,
});

// You can add instance or static methods here if you need
// BookSchema.methods.someMethod = function () { ... }
// Compile the model
const Book = model('Book', BookSchema);

module.exports = Book;

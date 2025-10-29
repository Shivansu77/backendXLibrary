import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../apis/book-api';
import { studentIssueBook } from '../apis/issued-api';

const BookCard = ({ book, onIssueBook }) => {
  const isAvailable = book.issuedQuantity < book.totalQuantity;
  
  return (
    <div className="bg-[#1C1C1E] p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
      <h3 className="text-base font-medium mb-1 truncate text-white">{book.title}</h3>
      <p className="text-gray-400 text-sm mb-2">by {book.author}</p>
      
      <div className="space-y-1 mb-3">
        <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
        <p className="text-xs text-gray-500">Genre: {book.genre}</p>
        <p className="text-xs text-gray-400 font-medium">Price: ₹{book.price}</p>
        <p className="text-xs text-gray-400">Total: {book.totalQuantity} | Issued: {book.issuedQuantity}</p>
        {book.publicationDate && (
          <p className="text-xs text-gray-500">Published: {new Date(book.publicationDate).getFullYear()}</p>
        )}
      </div>
      
      <button 
        onClick={() => onIssueBook(book._id)}
        className={`w-full py-2 px-3 rounded-md text-sm font-medium transition-colors ${
          isAvailable 
            ? 'bg-[#20A4F3] hover:bg-[#1B8FD9] text-white' 
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!isAvailable}
      >
        {isAvailable ? 'Issue Book' : 'Not Available'}
      </button>
    </div>
  );
};

const AllBooksScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleIssueBook = async (bookId) => {
    try {
      await studentIssueBook(bookId);
      setSuccess('Book issued successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchBooks(); // Refresh books to update availability
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to issue book');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (loading) return <div className="text-center p-8">Loading books...</div>;
  if (error) return <div className="text-center p-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="container mx-auto p-6">
        <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-6 mb-6">
          <h1 className="text-2xl font-semibold text-white mb-1">Library Collection</h1>
          <p className="text-gray-400">Discover and borrow books</p>
        </div>
      
        {success && (
          <div className="mb-4 p-3 bg-green-900/20 border border-green-800 text-green-300 rounded-lg">
            {success}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-800 text-red-300 rounded-lg">
            {error}
          </div>
        )}
      
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} onIssueBook={handleIssueBook} />
          ))}
        </div>
        {books.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No books available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooksScreen;
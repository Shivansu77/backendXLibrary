import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../apis/book-api';

const BookCard = ({ book }) => {
  const isAvailable = book.issuedQuantity < book.totalQuantity;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/30 transition-all duration-200 cursor-pointer">
      <h3 className="text-base font-semibold mb-1 truncate">{book.title}</h3>
      <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
      
      <div className="space-y-1 mb-3">
        <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
        <p className="text-xs text-gray-500">Genre: {book.genre}</p>
        <p className="text-xs text-gray-600 font-medium">Price: ₹{book.price}</p>
        <p className="text-xs text-gray-600">Total: {book.totalQuantity} | Issued: {book.issuedQuantity}</p>
        {book.publicationDate && (
          <p className="text-xs text-gray-500">Published: {new Date(book.publicationDate).getFullYear()}</p>
        )}
      </div>
      
      <button 
        className={`w-full py-1.5 px-3 rounded text-sm font-medium ${
          isAvailable 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-gray-400 text-gray-600 cursor-not-allowed'
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

  useEffect(() => {
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
    fetchBooks();
  }, []);

  if (loading) return <div className="text-center p-8">Loading books...</div>;
  if (error) return <div className="text-center p-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      {books.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No books available</p>
      )}
    </div>
  );
};

export default AllBooksScreen;
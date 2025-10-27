import React, { useState } from "react";
import { addBook } from '../apis/book-api';

const AddBookScreen = () => {
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    author: "",
    publicationDate: "",
    genre: "",
    totalQuantity: "",
    price: ""
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await addBook(book);
      setSuccess("Book added successfully!");
      setBook({
        isbn: "",
        title: "",
        author: "",
        publicationDate: "",
        genre: "",
        totalQuantity: "",
        price: ""
      });
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add book.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md bg-white shadow rounded mt-8">
      <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Publication Date</label>
          <input
            type="date"
            name="publicationDate"
            value={book.publicationDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Genre</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Total Quantity</label>
          <input
            type="number"
            name="totalQuantity"
            value={book.totalQuantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="1"
            step="0.01"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-800"
        >
          Add Book
        </button>
      </form>
      {success && (
        <p className="text-green-600 mt-4">{success}</p>
      )}
      {error && (
        <p className="text-red-600 mt-4">{error}</p>
      )}
    </div>
  );
};

export default AddBookScreen;

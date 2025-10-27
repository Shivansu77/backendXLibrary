import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAllBooks } from '../apis/book-api';
import { getAllStudents, issueBook } from '../apis/issued-api';

const IssuedForm = () => {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch books
      const booksData = await getAllBooks();
      const bookOptions = booksData.map(book => ({
        value: book._id,
        label: `${book.title} by ${book.author} (Available: ${book.totalQuantity - book.issuedQuantity})`,
        book: book
      })).filter(option => option.book.totalQuantity > option.book.issuedQuantity);

      setBooks(bookOptions);

      // Try to fetch students, fallback if endpoint doesn't exist
      try {
        const studentsData = await getAllStudents();
        const studentOptions = studentsData.map(student => ({
          value: student._id,
          label: `${student.firstName} ${student.lastName} (${student.email})`
        }));
        setStudents(studentOptions);
      } catch (studentErr) {
        console.warn('Students API not available, using empty list');
        setStudents([]);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedStudent || !selectedBook) {
      setError('Please select both student and book');
      return;
    }

    if (students.length === 0) {
      setError('No students available. Please add students first.');
      return;
    }

    try {
      await issueBook({
        studentId: selectedStudent.value,
        bookId: selectedBook.value
      });
      
      setSuccess(`Book "${selectedBook.book.title}" issued to ${selectedStudent.label} successfully!`);
      setSelectedStudent(null);
      setSelectedBook(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to issue book');
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '40px',
      borderColor: '#d1d5db',
      '&:hover': {
        borderColor: '#9ca3af'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#374151'
    })
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Issue Book</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Student
            </label>
            <Select
              value={selectedStudent}
              onChange={setSelectedStudent}
              options={students}
              styles={customStyles}
              placeholder={students.length === 0 ? "No students available" : "Search and select a student..."}
              isSearchable
              isClearable
              isDisabled={students.length === 0}
              className="react-select-container"
              classNamePrefix="react-select"
            />
            {students.length === 0 && (
              <p className="text-sm text-orange-600 mt-1">
                Students API endpoint not available. Please implement /user/students endpoint.
              </p>
            )}
          </div>

          {/* Book Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Book
            </label>
            <Select
              value={selectedBook}
              onChange={setSelectedBook}
              options={books}
              styles={customStyles}
              placeholder="Search and select a book..."
              isSearchable
              isClearable
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Issue Book
            </button>
          </div>
        </form>

        {/* Success/Error Messages */}
        {success && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuedForm;
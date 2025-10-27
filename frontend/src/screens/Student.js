import React from 'react';
import { LogoutUser } from '../utils/UserApi';
import { useNavigate } from 'react-router-dom';

const Student = () => {
  const navigate = useNavigate();
  console.log('Student component is rendering');

  const handleLogout = async () => {
    await LogoutUser();
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">📚 Student Dashboard</h1>
          <p className="text-blue-600 text-lg">Welcome! You are logged in as a <strong>Student</strong></p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">📖 My Books</h2>
            <p className="text-gray-600 mb-4">View and manage your borrowed books</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              View Borrowed Books
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">🔍 Search Books</h2>
            <p className="text-gray-600 mb-4">Find books in the library catalog</p>
            <button 
              onClick={() => navigate('/books')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
            >
              Browse All Books
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;

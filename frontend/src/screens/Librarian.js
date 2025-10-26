import React from 'react';
import { LogoutUser } from '../utils/UserApi';
import { useNavigate } from 'react-router-dom';

const Librarian = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await LogoutUser();
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">📚 Librarian Dashboard</h1>
          <p className="text-purple-600 text-lg">Welcome! You are logged in as a <strong>Librarian</strong></p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">📚 Manage Books</h2>
            <p className="text-gray-600 mb-4">Add, edit, or remove books from catalog</p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors">
              Manage Books
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">👥 Manage Students</h2>
            <p className="text-gray-600 mb-4">View and manage student accounts</p>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition-colors">
              View Students
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">📈 Reports</h2>
            <p className="text-gray-600 mb-4">Generate library usage reports</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors">
              View Reports
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

export default Librarian;

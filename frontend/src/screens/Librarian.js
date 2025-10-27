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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Librarian Dashboard</h1>
              <p className="text-gray-600 text-lg">Manage your library operations efficiently</p>
            </div>
            <div className="bg-purple-50 px-4 py-2 rounded-lg">
              <span className="text-purple-700 font-semibold">Admin Portal</span>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Books</h3>
            <p className="text-3xl font-bold text-blue-600">1,247</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-400">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Students</h3>
            <p className="text-3xl font-bold text-green-600">156</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-400">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Books Issued</h3>
            <p className="text-3xl font-bold text-orange-600">89</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-400">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Overdue</h3>
            <p className="text-3xl font-bold text-red-600">12</p>
          </div>
        </div>
        
        {/* Management Sections */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8 max-w-4xl mx-auto">
          <div 
            onClick={() => navigate('/add-book')}
            className="bg-gray-700 rounded-lg p-3 shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-gray-600 w-40"
          >
            <h3 className="text-sm font-bold text-white mb-1">Add Book</h3>
            <p className="text-gray-200 text-xs">Add new books</p>
          </div>
          <div 
            onClick={() => navigate('/books')}
            className="bg-gray-700 rounded-lg p-3 shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-gray-600 w-40"
          >
            <h3 className="text-sm font-bold text-white mb-1">View Books</h3>
            <p className="text-gray-200 text-xs">Browse catalog</p>
          </div>
          <div 
            onClick={() => navigate('/issue-book')}
            className="bg-gray-700 rounded-lg p-3 shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-gray-600 w-40"
          >
            <h3 className="text-sm font-bold text-white mb-1">Issue Book</h3>
            <p className="text-gray-200 text-xs">Issue to students</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3 shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-gray-600 w-40">
            <h3 className="text-sm font-bold text-white mb-1">Students</h3>
            <p className="text-gray-200 text-xs">Manage accounts</p>
          </div>
          <div 
            onClick={() => navigate('/issued-books')}
            className="bg-gray-700 rounded-lg p-3 shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-gray-600 w-40"
          >
            <h3 className="text-sm font-bold text-white mb-1">Issued Books</h3>
            <p className="text-gray-200 text-xs">Track issued</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3 shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-gray-600 w-40">
            <h3 className="text-sm font-bold text-white mb-1">Overdue</h3>
            <p className="text-gray-200 text-xs">Monitor returns</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3 shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-gray-600 w-40">
            <h3 className="text-sm font-bold text-white mb-1">Reports</h3>
            <p className="text-gray-200 text-xs">View statistics</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3 shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-gray-600 w-40">
            <h3 className="text-sm font-bold text-white mb-1">Export</h3>
            <p className="text-gray-200 text-xs">Download data</p>
          </div>
        </div>
        
        {/* Logout Section */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors font-medium shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Librarian;

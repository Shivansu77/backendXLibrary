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
    <div className="min-h-screen bg-[#0F0F0F] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1">Librarian Dashboard</h1>
              <p className="text-gray-400">Manage library operations</p>
            </div>
            <div className="bg-[#20A4F3]/10 px-3 py-1 rounded border border-[#20A4F3]/20">
              <span className="text-[#20A4F3] text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-1">Total Books</h3>
            <p className="text-2xl font-semibold text-[#20A4F3]">1,247</p>
          </div>
          <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-1">Active Students</h3>
            <p className="text-2xl font-semibold text-white">156</p>
          </div>
          <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-1">Books Issued</h3>
            <p className="text-2xl font-semibold text-white">89</p>
          </div>
          <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-1">Overdue</h3>
            <p className="text-2xl font-semibold text-red-400">12</p>
          </div>
        </div>
        
        {/* Management Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 max-w-4xl mx-auto">
          <div 
            onClick={() => navigate('/add-book')}
            className="bg-[#20A4F3] hover:bg-[#1B8FD9] rounded-lg p-3 cursor-pointer transition-colors"
          >
            <h3 className="text-sm font-medium text-white mb-1">Add Book</h3>
            <p className="text-blue-100 text-xs">Add new books</p>
          </div>
          <div 
            onClick={() => navigate('/books')}
            className="bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800 rounded-lg p-3 cursor-pointer transition-colors"
          >
            <h3 className="text-sm font-medium text-white mb-1">View Books</h3>
            <p className="text-gray-400 text-xs">Browse catalog</p>
          </div>
          <div 
            onClick={() => navigate('/issue-book')}
            className="bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800 rounded-lg p-3 cursor-pointer transition-colors"
          >
            <h3 className="text-sm font-medium text-white mb-1">Issue Book</h3>
            <p className="text-gray-400 text-xs">Issue to students</p>
          </div>
          <div className="bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800 rounded-lg p-3 cursor-pointer transition-colors">
            <h3 className="text-sm font-medium text-white mb-1">Students</h3>
            <p className="text-gray-400 text-xs">Manage accounts</p>
          </div>
          <div 
            onClick={() => navigate('/issued-books')}
            className="bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800 rounded-lg p-3 cursor-pointer transition-colors"
          >
            <h3 className="text-sm font-medium text-white mb-1">Issued Books</h3>
            <p className="text-gray-400 text-xs">Track issued</p>
          </div>
          <div className="bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800 rounded-lg p-3 cursor-pointer transition-colors">
            <h3 className="text-sm font-medium text-white mb-1">Overdue</h3>
            <p className="text-gray-400 text-xs">Monitor returns</p>
          </div>
          <div className="bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800 rounded-lg p-3 cursor-pointer transition-colors">
            <h3 className="text-sm font-medium text-white mb-1">Reports</h3>
            <p className="text-gray-400 text-xs">View statistics</p>
          </div>
          <div className="bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800 rounded-lg p-3 cursor-pointer transition-colors">
            <h3 className="text-sm font-medium text-white mb-1">Export</h3>
            <p className="text-gray-400 text-xs">Download data</p>
          </div>
        </div>
        
        {/* Logout Section */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Librarian;

import React, { useState, useEffect } from 'react';
import { getIssuedBooks, returnBook } from '../apis/issued-api';

const IssuedScreen = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getIssuedBooks();
      console.log('Fetched issued books from API:', data);
      setIssuedBooks(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch issued books:', error);
      setError('Failed to load issued books. Please try again later.');
      setIssuedBooks([]);
      setLoading(false);
    }
  };

  const filteredBooks = issuedBooks.filter(item =>
    (item.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (item.student?.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (item.book?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (item.book?.author?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  const handleReturn = async (issueId) => {
    try {
      await returnBook(issueId);
      fetchIssuedBooks(); // Refresh the list
    } catch (error) {
      console.error('Failed to return book:', error);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'issued':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading issued books...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600 p-4 bg-red-100 rounded-lg">
          {error}
          <button 
            onClick={fetchIssuedBooks} 
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Issued Books</h1>
          
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by student name, email, book title, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-sm text-gray-600">
            Total issued books: {filteredBooks.length}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.student?.name || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{item.student?.email || 'N/A'}</div>
                      <div className="text-xs text-gray-400">ID: {item.student?.id || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.book?.title || 'N/A'}</div>
                      <div className="text-sm text-gray-500">by {item.book?.author || 'N/A'}</div>
                      <div className="text-xs text-gray-400">ISBN: {item.book?.isbn || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.issueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(item.status)}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleReturn(item.id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Return
                    </button>
                    <button className="text-orange-600 hover:text-orange-900">
                      Extend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No issued books found.
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuedScreen;
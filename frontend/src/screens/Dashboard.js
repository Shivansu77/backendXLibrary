import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../utils/UserApi';

const Dashboard = () => {
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(true);
  
  // For testing purposes, we'll use a simple redirect function
  const navigate = window.location ? 
    (path) => { window.location.href = path; } : 
    () => { console.log('Navigation not available'); };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserType(user.role);
        setLoading(false);

        // Auto-redirect as soon as we know the role
        if (user.role === 'librarian') {
          navigate('/librarian');
        } else if (user.role === 'user') {
          navigate('/student');
        }
      } else {
        // No user, force login
        setLoading(false);
        navigate('/login');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await LogoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback navigation
      window.location.href = '/login';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1C1C1E] rounded-lg border border-gray-800 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-white mb-3">Dashboard</h1>
            <p className="text-gray-400">
              Welcome back, <span className="text-[#20A4F3] font-medium">{userType}</span>
            </p>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

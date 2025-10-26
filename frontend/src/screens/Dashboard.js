import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../utils/UserApi';

const Dashboard = () => {
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

  const handleLogout = async () => {
    await LogoutUser();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">
        Welcome, you are logged in as: <span className="font-semibold text-green-700">{userType}</span>
      </p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

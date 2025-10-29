import React, { useState } from 'react';
import { loginUserFunction } from '../utils/AuthUtils';
import { SignUpUser } from '../utils/UserApi';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUserFunction(loginData);
      window.dispatchEvent(new Event('storage'));
      if (data.user.role === 'librarian') {
        navigate('/librarian');
      } else {
        navigate('/student');
      }
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await SignUpUser(registerData);
      window.dispatchEvent(new Event('storage'));
      if (data.user.role === 'librarian') {
        navigate('/librarian');
      } else {
        navigate('/student');
      }
    } catch (err) {
      setError(err?.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="mb-8">
            <span className="text-2xl md:text-3xl font-medium text-[#20A4F3] animate-typewriter">Welcome to Library App</span>
          </div>
          <h1 className="text-8xl font-bold text-white mb-6">
            Library<span className="text-[#20A4F3]">App</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your digital gateway to knowledge. Discover, borrow, and manage books with ease.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-[#20A4F3] hover:bg-[#1B8FD9] text-white px-8 py-4 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/books')}
              className="bg-transparent hover:bg-[#20A4F3] text-[#20A4F3] hover:text-white border-2 border-[#20A4F3] px-8 py-4 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Books
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => {setShowLogin(false); setShowRegister(true);}}
                className="text-blue-600 hover:underline"
              >
                Don't have an account? Register
              </button>
            </div>
            <button
              onClick={() => {setShowLogin(false); setError('');}}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={registerData.firstName}
                  onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={registerData.lastName}
                  onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-6">
                <select
                  value={registerData.role}
                  onChange={(e) => setRegisterData({...registerData, role: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="user">Student</option>
                  <option value="librarian">Librarian</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
              >
                Register
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => {setShowRegister(false); setShowLogin(true);}}
                className="text-blue-600 hover:underline"
              >
                Already have an account? Login
              </button>
            </div>
            <button
              onClick={() => {setShowRegister(false); setError('');}}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
import { useState } from "react";
import { loginUserFunction } from '../utils/AuthUtils';
import { useNavigate, Link } from 'react-router-dom';

const LoginScreen = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validateCredentials()) {
      try {
        const data = await loginUserFunction(credentials);
        // Trigger storage event to notify PrivateRoute components
        window.dispatchEvent(new Event('storage'));
        
        if (data.user.role === "librarian") {
          navigate('/librarian');
        } else {
          navigate('/student');
        }
      } catch (err) {
        setError(err?.response?.data?.error || "Login failed. Please try again.");
      }
    } else {
      setError("Please enter both email and password.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validateCredentials = () => {
    return credentials.email?.length && credentials.password?.length;
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLoginSubmit}
          className="bg-white shadow-xl rounded-xl px-8 py-8 border-t-4 border-indigo-500"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Welcome Back
          </h2>
          {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Register link for new users */}
        <div className="text-center mt-6">
          <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium transition">
            Don't have an account? Create one
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;

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
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleLoginSubmit}
          className="bg-white shadow-md rounded-lg px-8 py-6"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Login
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
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register link for new users */}
        <div className="text-center mt-4">
          <Link to="/register" className="text-blue-600 hover:underline">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;

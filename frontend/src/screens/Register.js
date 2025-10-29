import { useState } from "react";
import { SignUpUser } from '../utils/UserApi';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user"    // default to "user"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  // toggle between "user" and "librarian"
  const handleToggleRole = () => {
    setForm({ ...form, role: form.role === "user" ? "librarian" : "user" });
  };

  const validateForm = () =>
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.password.trim() &&
    form.password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) {
      setError("All fields are required and password must be at least 8 characters.");
      return;
    }
    try {
      const userData = await SignUpUser(form);
      if (userData.user.role === "librarian") navigate("/Librarian");
      else navigate("/Student");
    } catch (err) {
      setError(err?.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl px-8 py-8 border-t-4 border-emerald-500">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Account</h2>
          {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

          {/* First Name */}
          <div className="mb-5">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-5">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password (min 8 chars)"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Role Toggle Switch (IMPROVED UI) */}
          <div className="mb-6 flex flex-col items-center">
            <span className="block mb-2 text-sm font-medium text-gray-700">
              Register as
            </span>
            <div className="flex items-center space-x-4">
              <span className={`font-semibold text-sm ${form.role === "user" ? "text-green-700" : "text-gray-400"}`}>User</span>
              <button
                type="button"
                onClick={handleToggleRole}
                className={
                  `relative flex items-center w-14 h-7 bg-gray-300 rounded-full p-1 duration-300 ease-in-out
                  focus:outline-none ${form.role === "librarian" ? "bg-green-600" : "bg-gray-300"}`
                }
                aria-label="Toggle role"
              >
                <span
                  className={
                    `flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-lg transform duration-300 ease-in-out
                    ${form.role === "librarian" ? "translate-x-7 text-green-700" : "translate-x-0 text-gray-900"}`
                  }>
                  {form.role === "librarian" ? "L" : "U"}
                </span>
              </button>
              <span className={`font-semibold text-sm ${form.role === "librarian" ? "text-green-700" : "text-gray-400"}`}>Librarian</span>
            </div>
            <span className="mt-2 text-xs text-gray-500">
              {form.role === "librarian"
                ? "Librarian permissions"
                : "Regular user"}
            </span>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium transition">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;

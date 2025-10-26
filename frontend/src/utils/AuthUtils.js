// src/utils/AuthUtils.js
import { LoginUser, SignUpUser as RegisterUser } from './UserApi';

// Retrieve stored token asynchronously
const getUserToken = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = localStorage.getItem('token');
      resolve(token);
    }, 100);
  });
};

// Save user and token data in localStorage
const setUser = (data) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
};

// Register new user, store token locally, and return user data
const registerUserFunction = async ({ name, email, password }) => {
  const data = await RegisterUser({ name, email, password });
  setUser(data);
  return data;
};

// Handle login similarly
const loginUserFunction = async ({ email, password }) => {
  const data = await LoginUser({ email, password });
  setUser(data);
  return data;
};

export { getUserToken, loginUserFunction, registerUserFunction };

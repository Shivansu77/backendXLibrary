// src/utils/UserApi.js
import LibraryAppBackend from '../apis/LibraryAppBackend';

// Login API call
export const LoginUser = async ({ email, password }) => {
  const { data } = await LibraryAppBackend.post('/user/login', {
    email,
    password,
  });
  return data; // Expects { token, user }
};

// Signup/Register API call
export const SignUpUser = async ({ firstName, lastName, email, password, role }) => {
  const { data } = await LibraryAppBackend.post('/user/register', {
    firstName,
    lastName,
    email,
    password,
    role
  });
  return data; // Expects { token, user }
};

export const LogoutUser = async () => {
  // (OPTIONAL: If you have a backend logout endpoint to blacklist JWT, call it here)
  // await LibraryAppBackend.post('/user/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import Student from './screens/Student';
import Librarian from './screens/Librarian';
import Register from './screens/Register';
import AllBooksScreen from './screens/AllBooksScreen';
import NavBar from './components/NavBar';
import PrivateRoute from '../src/components/privateRoute'; // IMPORT IS CASE-SENSITIVE!
import AddBookScreen from './screens/AddBookScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <LoginScreen />
      </>
    )
  },
  {
    path: "/login",
    element: (
      <>
        <NavBar />
        <LoginScreen />
      </>
    )
  },
  {
    path: "/dashboard",
    element: (
      <>
        <NavBar />
        <Dashboard />
      </>
    )
  },
  {
    path: "/student",
    element: (
      <>
        <NavBar />
        <PrivateRoute requiredRole="user">
          <Student />
        </PrivateRoute>
      </>
    )
  },
  {
    path: "/librarian",
    element: (
      <>
        <NavBar />
        <PrivateRoute requiredRole="librarian">
          <Librarian />
        </PrivateRoute>
      </>
    )
  },
  {
    path: "/register",
    element: (
      <>
        <NavBar />
        <Register />
      </>
    )
  },
  {
    path: "/books",
    element: (
      <>
        <NavBar />
        <PrivateRoute>
          <AllBooksScreen />
        </PrivateRoute>
      </>
    )
  },
  {
    path: "/add-book",
    element: (
      <>
        <NavBar />
        <AddBookScreen />
      </>
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

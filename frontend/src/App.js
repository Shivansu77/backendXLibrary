import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import Student from './screens/Student';
import Librarian from './screens/Librarian';
import Register from './screens/Register';
import AllBooksScreen from './screens/AllBooksScreen';
import NavBar from './components/NavBar';
import PrivateRoute from './components/privateRoute';
import AddBookScreen from './screens/AddBookScreen';
import IssuedForm from './screens/IssuedForm';
import IssuedScreen from './screens/IssuedScreen';

const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="student" element={<Student />} />
          <Route path="librarian" element={<Librarian />} />
          <Route path="register" element={<Register />} />
          <Route path="books" element={<AllBooksScreen />} />
          <Route path="add-book" element={<AddBookScreen />} />
          <Route path="issue-book" element={<IssuedForm />} />
          <Route path="issued-books" element={<IssuedScreen />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

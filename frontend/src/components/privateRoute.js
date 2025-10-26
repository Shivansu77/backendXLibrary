import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PrivateRoute = ({ children, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      console.log('PrivateRoute checkAuth - token:', token, 'user:', user);
      
      if (token && user) {
        const userData = JSON.parse(user);
        console.log('User data:', userData);
        setIsAuthenticated(true);
        setUserRole(userData.role);
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
      setIsLoading(false);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  console.log('PrivateRoute render - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated, 'userRole:', userRole, 'requiredRole:', requiredRole);

  if (isLoading) {
    console.log('PrivateRoute: Still loading...');
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('PrivateRoute: Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    console.log('PrivateRoute: Wrong role, redirecting. UserRole:', userRole, 'RequiredRole:', requiredRole);
    return <Navigate to={userRole === "librarian" ? "/librarian" : "/student"} replace />;
  }

  console.log('PrivateRoute: Rendering children');
  return children;
};

export default PrivateRoute;

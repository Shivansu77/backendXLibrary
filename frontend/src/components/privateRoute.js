import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PrivateRoute = ({ children, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        console.log('PrivateRoute checkAuth - token:', token ? 'exists' : 'missing', 'user:', user ? 'exists' : 'missing');
        
        if (token && user) {
          try {
            const userData = JSON.parse(user);
            console.log('User data role:', userData.role);
            setIsAuthenticated(true);
            setUserRole(userData.role);
          } catch (error) {
            console.error('Error parsing user data:', error);
            setIsAuthenticated(false);
            setUserRole(null);
            // Clear invalid data
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error('Error in checkAuth:', error);
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
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
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-gray-600">Loading...</div>
    </div>;
  }

  if (!isAuthenticated) {
    console.log('PrivateRoute: Not authenticated, redirecting to login');
    // Use window.location for a full page reload to avoid React Router context issues
    window.location.href = '/login';
    return null;
  }

  if (requiredRole && userRole !== requiredRole) {
    console.log('PrivateRoute: Wrong role, redirecting. UserRole:', userRole, 'RequiredRole:', requiredRole);
    const redirectPath = userRole === "librarian" ? "/librarian" : "/student";
    window.location.href = redirectPath;
    return null;
  }
  
  // Authentication successful, render children
  console.log('PrivateRoute: Rendering children');
  return children;
};

export default PrivateRoute;

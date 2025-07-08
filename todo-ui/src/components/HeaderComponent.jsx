import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isUserLoggedIn, logout } from '../services/AuthService';

const HeaderComponent = () => {
  const [isAuth, setIsAuth] = useState(isUserLoggedIn());
  const navigator = useNavigate();

  // useEffect(() => {
  //   // Add a listener to storage changes in case another tab logs out
  //   const handleStorageChange = () => {
  //     setIsAuth(isUserLoggedIn());
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  const handleLogout = () => {
    logout();
    setIsAuth(false);            // Update local state
    navigator('/login');          // Redirect after logout
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div>
          <NavLink to="/" className="navbar-brand">
            Todo Management Application
          </NavLink>
        </div>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {isAuth && (
              <li className="nav-item">
                <NavLink to="/todos" className="nav-link">
                  Todos
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!isAuth && (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {isAuth && (
              <li className="nav-item">
                {/* Use button instead of NavLink since it's not a navigation route */}
                <button onClick={handleLogout} className="btn btn-link nav-link">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
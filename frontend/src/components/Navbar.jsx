import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  const user = localStorage.getItem('user');
  var location = useLocation();
  location = location.pathname.split('/')[1];

  const handleLogOut = async (e) => {
    // console.log(user);
    localStorage.removeItem('user');
    await dispatch({ type: 'LOGIN_START' });
    toast.info('Logged Out!');
  };
  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-10 mx-auto">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <NavLink className="navbar-brand" to=" ">
                  Travel Accuracy
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                    {user && (
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) => {
                            return isActive
                              ? 'nav-link menu_active'
                              : 'nav-link';
                          }}
                          aria-current="page"
                          to="/dashboard"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )}
                    {!user && (
                      <li className="nav-item">
                        <NavLink
                          className={({ isActive }) => {
                            return isActive
                              ? 'nav-link menu_active'
                              : 'nav-link';
                          }}
                          aria-current="page"
                          to="/"
                        >
                          Home
                        </NavLink>
                      </li>
                    )}
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) => {
                          return isActive ? 'nav-link menu_active' : 'nav-link';
                        }}
                        to="/service"
                      >
                        Services
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) => {
                          return isActive ? 'nav-link menu_active' : 'nav-link';
                        }}
                        to="/about"
                      >
                        About
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) => {
                          return isActive ? 'nav-link menu_active' : 'nav-link';
                        }}
                        to="/contact"
                      >
                        Contact
                      </NavLink>
                    </li>
                  </ul>
                  <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                    {!user && (
                      <li className="nav-item login-item">
                        {location === 'login' && (
                          <NavLink
                            className={({ isActive }) => {
                              return isActive
                                ? 'nav-link menu_active'
                                : 'btn btn-primary';
                            }}
                            to="/register"
                          >
                            Register
                          </NavLink>
                        )}
                        {location !== 'login' && (
                          <NavLink
                            className={({ isActive }) => {
                              return isActive
                                ? 'nav-link menu_active'
                                : 'btn btn-primary';
                            }}
                            to="/login"
                          >
                            Login
                          </NavLink>
                        )}
                      </li>
                    )}
                    {user && (
                      <li>
                        <button
                          className="btn btn-danger"
                          onClick={handleLogOut}
                        >
                          Log out
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

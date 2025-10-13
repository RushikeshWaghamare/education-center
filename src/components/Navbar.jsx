import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaSun, FaMoon, FaSearch } from "react-icons/fa";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-light");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container py-2">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🎓 EduSystem
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Section */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Links */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold" : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink
                to="/students"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold" : "")
                }
              >
                Students
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink
                to="/teachers"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold" : "")
                }
              >
                Teachers
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink
                to="/departments"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-bold" : "")
                }
              >
                Departments
              </NavLink>
            </li>
          </ul>

          {/* Right Controls */}
          <div className="d-flex align-items-center gap-3">
            {/* Search Bar */}
            <form className="d-none d-md-flex position-relative">
              <FaSearch
                className="position-absolute top-50 start-0 translate-middle-y text-light ms-2"
                size={14}
              />
              <input
                type="text"
                className="form-control form-control-sm ps-4 rounded-pill"
                placeholder="Search..."
                style={{ width: "180px" }}
              />
            </form>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="btn btn-outline-light btn-sm rounded-circle"
              title="Toggle Theme"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Profile Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle className="me-2" size={18} /> Admin
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end shadow-sm"
                aria-labelledby="profileDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="#">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Settings
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item text-danger" to="#">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container py-2">
        {/* 🔹 Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🎓 EduSystem
        </Link>

        {/* 🔹 Mobile Toggler */}
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

        {/* 🔹 Collapsible Nav Section */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Centered Nav Links */}
          <ul className="navbar-nav mx-auto">
            {[
              { to: "/", label: "Home" },
              { to: "/students", label: "Students" },
              { to: "/teachers", label: "Teachers" },
              { to: "/departments", label: "Departments" },
            ].map(({ to, label }) => (
              <li className="nav-item mx-2" key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold" : "")
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 🔹 Right Controls */}
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
};

export default Navbar;

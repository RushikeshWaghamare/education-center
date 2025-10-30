import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container py-2">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🎓 EduSystem
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "AboutUs" },
              { to: "/departments", label: "Courses" },
              { to: "/students", label: "Learners" },
              { to: "/teachers", label: "Faculties" },
              { to: "/contact", label: "ContactUs" },
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

          <div className="d-flex align-items-center gap-3">
            <form className="d-none d-md-flex position-relative">
              <input
                type="text"
                className="form-control form-control-sm ps-4 rounded-pill"
                placeholder="Search..."
                style={{ width: "180px" }}
              />
            </form>

            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-white fw-semibold">
                  👋 Hi, {user.firstName}
                </span>
                <button className="btn btn-outline-light btn-sm" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm">
                  Log In
                </Link>
                <Link to="/signup" className="btn btn-light btn-sm text-primary fw-bold">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

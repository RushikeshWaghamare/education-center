import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBuilding,
  FaBars,
  FaHome,
  FaSignOutAlt,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const getNavLinkClass = (isActive) =>
    `nav-link d-flex align-items-center ${
      isActive ? "fw-bold bg-light text-primary rounded-3" : "text-white"
    }`;

  const menuItems = [
    { to: "/", label: "Dashboard", icon: <FaHome className="me-2 fs-5" /> },
    { to: "/about", label: "AboutUs", icon: <FaInfoCircle className="me-2 fs-5" /> },
    { to: "/departments", label: "Courses", icon: <FaBuilding className="me-2 fs-5" /> },
    { to: "/students", label: "Lerners", icon: <FaUserGraduate className="me-2 fs-5" /> },
    { to: "/teachers", label: "Faculties", icon: <FaChalkboardTeacher className="me-2 fs-5" /> },
    { to: "/contact", label: "ContactUs", icon: <FaEnvelope className="me-2 fs-5" /> },
  ];

  return (
    <aside
      className={`d-flex flex-column bg-primary text-white p-3 shadow-sm position-fixed top-0 start-0 h-100 ${
        isCollapsed ? "sidebar-closed" : "sidebar-open"
      }`}
      style={{
        transition: "width 0.3s ease",
        width: isCollapsed ? "80px" : "240px",
        zIndex: 1050, // keeps it above main content
        overflow: "hidden", // prevents sidebar from scrolling
      }}
    >
      {/* 🔹 Brand Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        {!isCollapsed && <h4 className="fw-bold mb-0">EduSystem</h4>}
        <button
          onClick={toggleSidebar}
          className="btn btn-sm btn-outline-light"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          <FaBars />
        </button>
      </div>

      {/* 🔹 Navigation Menu */}
      <ul className="nav flex-column flex-grow-1">
        {menuItems.map(({ to, label, icon }) => (
          <li className="nav-item mb-2" key={to}>
            <NavLink to={to} className={({ isActive }) => getNavLinkClass(isActive)}>
              {icon}
              {!isCollapsed && label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* 🔹 Footer / Logout */}
      <div>
        <hr className="border-light" />
        <button className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center">
          <FaSignOutAlt className="me-2" />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

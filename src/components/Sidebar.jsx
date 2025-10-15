import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBuilding,
  FaBars,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  // ✅ Reusable helper for active/inactive link styles
  const getNavLinkClass = (isActive) =>
    `nav-link d-flex align-items-center ${
      isActive
        ? "fw-bold bg-light text-primary rounded-3"
        : "text-white"
    }`;

  // ✅ Centralized menu data for easier management
  const menuItems = [
    { to: "/", label: "Dashboard", icon: <FaHome className="me-2 fs-5" /> },
    { to: "/students", label: "Students", icon: <FaUserGraduate className="me-2 fs-5" /> },
    { to: "/teachers", label: "Teachers", icon: <FaChalkboardTeacher className="me-2 fs-5" /> },
    { to: "/departments", label: "Departments", icon: <FaBuilding className="me-2 fs-5" /> },
  ];

  return (
    <aside
      className={`d-flex flex-column bg-primary text-white vh-100 p-3 shadow-sm ${
        isCollapsed ? "sidebar-closed" : "sidebar-open"
      }`}
      style={{
        transition: "width 0.3s ease",
        overflowY: "auto",
        width: isCollapsed ? "80px" : "240px",
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
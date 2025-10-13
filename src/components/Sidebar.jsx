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
  // Start collapsed by default
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={`d-flex flex-column bg-primary text-white vh-100 p-3 shadow-sm ${
        isCollapsed ? "sidebar-closed" : "sidebar-open"
      }`}
      style={{ transition: "width 0.3s ease", overflowY: "auto" }}
    >
      {/* Header / Brand */}
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

      {/* Nav Items */}
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center text-white ${
                isActive ? "fw-bold bg-light text-primary rounded-3" : ""
              }`
            }
          >
            <FaHome className="me-2 fs-5" />
            {!isCollapsed && "Dashboard"}
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/students"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center text-white ${
                isActive ? "fw-bold bg-light text-primary rounded-3" : ""
              }`
            }
          >
            <FaUserGraduate className="me-2 fs-5" />
            {!isCollapsed && "Students"}
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/teachers"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center text-white ${
                isActive ? "fw-bold bg-light text-primary rounded-3" : ""
              }`
            }
          >
            <FaChalkboardTeacher className="me-2 fs-5" />
            {!isCollapsed && "Teachers"}
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/departments"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center text-white ${
                isActive ? "fw-bold bg-light text-primary rounded-3" : ""
              }`
            }
          >
            <FaBuilding className="me-2 fs-5" />
            {!isCollapsed && "Departments"}
          </NavLink>
        </li>
      </ul>

      {/* Footer / Logout */}
      <div className="mt-auto">
        <hr className="border-light" />
        <button className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center">
          <FaSignOutAlt className="me-2" />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

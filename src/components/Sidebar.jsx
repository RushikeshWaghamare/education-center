import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-primary text-white vh-100 p-3" style={{ width: "220px" }}>
        <h3 className="text-center mb-4">EduSystem</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white d-flex align-items-center" to="/students">
              <FaUserGraduate className="me-2" /> Students
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white d-flex align-items-center" to="/teachers">
              <FaChalkboardTeacher className="me-2" /> Teachers
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link className="nav-link text-white d-flex align-items-center" to="/departments">
              <FaBuilding className="me-2" /> Departments
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        {/* Place your page content here */}
        <h2>Welcome to EduSystem Dashboard</h2>
      </div>
    </div>
  );
};

export default Sidebar;

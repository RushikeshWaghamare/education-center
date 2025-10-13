import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StudentList from "./components/StudentList";
import TeacherList from "./components/TeacherList";
import DepartmentList from "./components/DepartmentList";
import Footer from "./components/Footer";
import { FaUserGraduate, FaChalkboardTeacher, FaUniversity, FaChartLine } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Education Management Dashboard</h1>

      {/* Stats Cards */}
      <div className="row g-4 mb-5 text-center">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 rounded-4 p-3 h-100">
            <FaUserGraduate size={40} className="text-success mb-2" />
            <h4>Students</h4>
            <p className="text-muted">Manage all student profiles & records</p>
            <Link to="/students" className="btn btn-outline-success btn-sm">
              View Students
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 rounded-4 p-3 h-100">
            <FaChalkboardTeacher size={40} className="text-primary mb-2" />
            <h4>Teachers</h4>
            <p className="text-muted">Track and manage teaching staff</p>
            <Link to="/teachers" className="btn btn-outline-primary btn-sm">
              View Teachers
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 rounded-4 p-3 h-100">
            <FaUniversity size={40} className="text-warning mb-2" />
            <h4>Departments</h4>
            <p className="text-muted">Organize academic departments</p>
            <Link to="/departments" className="btn btn-outline-warning btn-sm">
              View Departments
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="card shadow-sm border-0 rounded-4 mb-5">
        <div className="card-body">
          <h5 className="card-title text-center text-secondary mb-4">
            <FaChartLine className="me-2" />
            Academic Overview (Analytics)
          </h5>
          <p className="text-center text-muted">
            📊 Analytics coming soon: visualize enrollment trends, performance stats, and department insights.
          </p>
          <div
            style={{
              background: "#f8f9fa",
              borderRadius: "12px",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#adb5bd",
              fontStyle: "italic",
            }}
          >
            Chart Placeholder
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">
          <h5 className="card-title text-secondary mb-4">📅 Recent Updates</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              🎓 New academic year starts on <strong>July 1st</strong>
            </li>
            <li className="list-group-item">
              🧑‍🏫 Faculty meeting scheduled for <strong>October 20th</strong>
            </li>
            <li className="list-group-item">
              🧾 Admissions for 2025 now open
            </li>
            <li className="list-group-item">
              🏆 Annual Sports Day event on <strong>December 5th</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100 bg-light">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/departments" element={<DepartmentList />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StudentList from "./components/StudentList";
import TeacherList from "./components/TeacherList";
import DepartmentList from "./components/DepartmentList";
import Footer from "./components/Footer";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUniversity,
  FaChartLine,
} from "react-icons/fa";

// ✅ Dashboard Component (moved outside render for clarity)
const Dashboard = () => {
  const cards = [
    {
      icon: <FaUserGraduate size={40} className="text-success mb-2" />,
      title: "Students",
      text: "Manage all student profiles & records",
      link: "/students",
      btnClass: "btn-outline-success",
    },
    {
      icon: <FaChalkboardTeacher size={40} className="text-primary mb-2" />,
      title: "Teachers",
      text: "Track and manage teaching staff",
      link: "/teachers",
      btnClass: "btn-outline-primary",
    },
    {
      icon: <FaUniversity size={40} className="text-warning mb-2" />,
      title: "Departments",
      text: "Organize academic departments",
      link: "/departments",
      btnClass: "btn-outline-warning",
    },
  ];

  const updates = [
    "🎓 New academic year starts on **July 1st**",
    "🧑‍🏫 Faculty meeting scheduled for **October 20th**",
    "🧾 Admissions for 2025 now open",
    "🏆 Annual Sports Day event on **December 5th**",
  ];

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Education Management Dashboard</h1>

      {/* 🔹 Stats Cards */}
      <div className="row g-4 mb-5 text-center">
        {cards.map(({ icon, title, text, link, btnClass }) => (
          <div className="col-md-4" key={title}>
            <div className="card shadow-sm border-0 rounded-4 p-3 h-100">
              {icon}
              <h4>{title}</h4>
              <p className="text-muted">{text}</p>
              <Link to={link} className={`btn ${btnClass} btn-sm`}>
                View {title}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Analytics Section */}
      <div className="card shadow-sm border-0 rounded-4 mb-5">
        <div className="card-body text-center">
          <h5 className="card-title text-secondary mb-4">
            <FaChartLine className="me-2" />
            Academic Overview (Analytics)
          </h5>
          <p className="text-muted">
            📊 Analytics coming soon: visualize enrollment trends, performance
            stats, and department insights.
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

      {/* 🔹 Recent Updates */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">
          <h5 className="card-title text-secondary mb-4">📅 Recent Updates</h5>
          <ul className="list-group list-group-flush">
            {updates.map((item, i) => (
              <li
                key={i}
                className="list-group-item"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ✅ Main App Layout
const App = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100 bg-light">
        <Navbar />

        <main className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/departments" element={<DepartmentList />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
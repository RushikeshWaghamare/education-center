import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AboutUs from "./components/AboutUs";
import StudentList from "./components/StudentList";
import TeacherList from "./components/TeacherList";
import DepartmentList from "./components/DepartmentList";
import Dashboard from "./components/Homepage";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import DepartmentDetail from "./components/DepartmentDetail";

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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/departments" element={<DepartmentList />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/departments/:id" element={<DepartmentDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
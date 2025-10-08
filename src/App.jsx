import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import TeacherList from "./components/TeacherList";
import DepartmentList from "./components/DepartmentList";
import Footer from "./components/Footer";

function Dashboard() {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Education Management Dashboard</h1>
      <div className="row">
        <div className="col-md-4 mb-3">
          <TeacherList />
        </div>
        <div className="col-md-4 mb-3">
          <DepartmentList />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/departments" element={<DepartmentList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

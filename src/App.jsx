import React from "react";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import TeacherList from "./components/TeacherList";
import DepartmentList from "./components/DepartmentList";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h1 className="text-center mb-4">Education Management Dashboard</h1>

        <div className="row">
          <div className="col-md-4 mb-3">
            <StudentList />
          </div>
          <div className="col-md-4 mb-3">
            <TeacherList />
          </div>
          <div className="col-md-4 mb-3">
            <DepartmentList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;

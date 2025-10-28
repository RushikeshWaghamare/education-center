import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const DepartmentDetail = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDepartment = async () => {
    try {
      const response = await fetch(`https://localhost:44303/api/Departments/${id}`);
      if (!response.ok) throw new Error("Failed to fetch department");
      const data = await response.json();
      setDepartment(data);
    } catch (error) {
      console.error("Error fetching department:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, [id]);

  if (loading)
    return <p className="text-center mt-5 fs-5 fw-semibold">Loading...</p>;

  if (!department)
    return (
      <p className="text-center mt-5 text-danger fw-semibold">
        Department not found.
      </p>
    );

  return (
    <div className="container mt-5 mb-5">
      <Link to="/departments" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft className="me-2" />
        Back to Departments
      </Link>

      <div className="card shadow-sm border-0 rounded-4 p-4">
        <h2 className="fw-bold text-primary mb-3">{department.departmentName}</h2>
        <p className="text-muted">{department.description || "No description available."}</p>

        <hr />

        {/* 🔹 You can extend this section later (faculty list, stats, etc.) */}
        <div>
          <h5 className="text-secondary">Department Overview</h5>
          <p className="text-muted">
            Welcome to the <strong>{department.departmentName}</strong> department! 
            Here you can find information about courses, teachers, and activities related to this department.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;

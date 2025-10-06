import React, { useEffect, useState } from "react";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:44303/api/Departments") // API endpoint
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch departments");
        return response.json();
      })
      .then((data) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5 fs-5 fw-semibold">Loading...</p>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Department List</h2>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover table-bordered text-center align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Department Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((d) => (
                <tr key={d.departmentID}>
                  <td className="fw-semibold">{d.departmentID}</td>
                  <td>{d.departmentName}</td>
                  <td>{d.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted fw-semibold p-3">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentList;

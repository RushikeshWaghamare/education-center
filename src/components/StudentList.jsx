import React, { useEffect, useState } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:44303/api/Students")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch students");
        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-5 fs-5 fw-semibold">Loading...</p>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Student List</h2>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover table-bordered align-middle text-center mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s.studentID} className="align-middle">
                  <td className="fw-semibold">{s.studentID}</td>
                  <td>{s.firstName}</td>
                  <td>{s.lastName}</td>
                  <td>{s.gender}</td>
                  <td>
                    {s.dateOfBirth
                      ? new Date(s.dateOfBirth).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted fw-semibold p-3">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;

import React, { useEffect, useState } from "react";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:44303/api/Teachers") // Adjust your API endpoint
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch teachers");
        return response.json();
      })
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-5 fs-5 fw-semibold">Loading...</p>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Teacher List</h2>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover table-bordered text-center align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Hire Date</th>
              <th>Department ID</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((t) => (
                <tr key={t.teacherID}>
                  <td className="fw-semibold">{t.teacherID}</td>
                  <td>{t.firstName}</td>
                  <td>{t.lastName}</td>
                  <td>{t.email}</td>
                  <td>{t.phone}</td>
                  <td>
                    {t.hireDate
                      ? new Date(t.hireDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{t.departmentID ?? "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted fw-semibold p-3">
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherList;

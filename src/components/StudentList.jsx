import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
 const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [studentsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");


  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  });

  // ✅ Fetch students with backend pagination
  const fetchStudents = async (page = 1) => {
  setLoading(true);
  try {
    const response = await fetch(
      `https://localhost:44303/api/Students?pageNumber=${page}&pageSize=${studentsPerPage}&search=${encodeURIComponent(search)}`
    );
    if (!response.ok) throw new Error("Failed to fetch students");
    const data = await response.json();

    setStudents(data.students);
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);

    // ✅ Update URL when page changes
    setSearchParams({ page, search });
  } catch (error) {
    console.error("Error fetching students:", error);
  } finally {
    setLoading(false);
  }
};


  // ✅ Load first page initially
  useEffect(() => {
  fetchStudents(pageFromUrl);
}, [pageFromUrl]);


  // ✅ Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submission (Add student)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...newStudent,
      firstName: newStudent.firstName.trim(),
      lastName: newStudent.lastName.trim() || null,
      gender: newStudent.gender || null,
      dateOfBirth: newStudent.dateOfBirth || null,
      email: newStudent.email.trim() || null,
      phone: newStudent.phone.trim() || null,
      address: newStudent.address.trim() || null,
    };

    try {
      const response = await fetch("https://localhost:44303/api/Students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (!response.ok) throw new Error(JSON.stringify(data));

      // ✅ Refresh list (first page)
      await fetchStudents(1);

      setShowForm(false);
      setNewStudent({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        address: "",
        status: "Active",
      });
      setCurrentPage(1);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // ✅ Pagination controls
  const paginate = (pageNumber) => fetchStudents(pageNumber);
  const nextPage = () => currentPage < totalPages && fetchStudents(currentPage + 1);
  const prevPage = () => currentPage > 1 && fetchStudents(currentPage - 1);


  if (loading)
    return <p className="text-center mt-5 fs-5 fw-semibold">Loading...</p>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold text-primary mb-3 text-center">Student List</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
      {/* Add New Student Button on the left */}
      <button
        className="btn btn-success fw-semibold"
        onClick={() => setShowForm(true)}
      >
        ➕ Add New Student
      </button>

      {/* Search Input + Button on the right */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          className="form-control"
          style={{ width: "180px" }} // fixed small width
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchStudents(1);
          }}
        />
        <button
          className="btn btn-primary ms-2"
          onClick={() => fetchStudents(1)}
        >
          Search
        </button>
      </div>
    </div>


      {/* Student Table */}
      <div className="table-responsive shadow-sm rounded">        
        <table className="table table-striped table-hover table-bordered align-middle text-center mb-0">
          <thead className="table-dark">
            <tr>
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
            {students.length ? (
              students.map((s) => (
                <tr key={s.studentID}>
                  <td>{s.firstName}</td>
                  <td>{s.lastName}</td>
                  <td>{s.gender}</td>
                  <td>
                    {s.dateOfBirth
                      ? new Date(s.dateOfBirth).toLocaleDateString("en-GB")
                      : "-"}
                  </td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted fw-semibold p-3">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center align-items-center mt-3">
          <ul className="pagination m-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={prevPage}>
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={nextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Add Student Modal */}
      {showForm && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-primary">Add New Student</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    {[
                      { label: "First Name", name: "firstName", type: "text", required: true },
                      { label: "Last Name", name: "lastName", type: "text", required: true },
                      { label: "Gender", name: "gender", type: "select", options: ["Male", "Female"], required: true },
                      { label: "Date of Birth", name: "dateOfBirth", type: "date", required: true },
                      { label: "Email", name: "email", type: "email", required: true },
                      { label: "Phone", name: "phone", type: "text", required: false },
                      { label: "Address", name: "address", type: "textarea", required: false },
                    ].map((field) => (
                      <div
                        className={field.name === "address" ? "col-12" : "col-md-6"}
                        key={field.name}
                      >
                        <label className="form-label">{field.label}</label>
                        {field.type === "select" ? (
                          <select
                            className="form-select"
                            name={field.name}
                            value={newStudent[field.name]}
                            onChange={handleChange}
                            required={field.required}
                          >
                            <option value="">Select</option>
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            className="form-control"
                            name={field.name}
                            rows="2"
                            value={newStudent[field.name]}
                            onChange={handleChange}
                          ></textarea>
                        ) : (
                          <input
                            type={field.type}
                            className="form-control"
                            name={field.name}
                            value={newStudent[field.name]}
                            onChange={handleChange}
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;

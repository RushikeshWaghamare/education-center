import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [studentsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

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
  const fetchStudents = async (page = 1, updateUrl = true) => {
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

      // ✅ Only update URL when user triggers action
    if (updateUrl) {
      const params = {};
      if (page > 1) params.page = page;
      if (search) params.search = search;
      setSearchParams(params);
    }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(pageFromUrl, false);
  }, []);

  // ✅ Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submission (Add / Edit)
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
      const url = editingStudentId
        ? `https://localhost:44303/api/Students/${editingStudentId}`
        : "https://localhost:44303/api/Students";

      const method = editingStudentId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
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

      await fetchStudents(editingStudentId ? currentPage : 1);
      showToast(
        editingStudentId
          ? "Student updated successfully!"
          : "Student added successfully!",
        "success"
      );

      setShowForm(false);
      setEditingStudentId(null);
      resetForm();
    } catch (error) {
      console.error("Error saving student:", error);
      showToast("Failed to save student.", "error");
    }
  };

  // ✅ Handle Delete Student
  const handleDelete = async (studentID) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(
        `https://localhost:44303/api/Students/${studentID}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete student");

      await fetchStudents(currentPage);
      showToast("Student deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting student:", error);
      showToast("Failed to delete student.", "error");
    }
  };

  // ✅ Edit Student Handler
  const handleEdit = (student) => {
    setEditingStudentId(student.studentID);
    setNewStudent({
      firstName: student.firstName || "",
      lastName: student.lastName || "",
      gender: student.gender || "",
      dateOfBirth: student.dateOfBirth
        ? student.dateOfBirth.split("T")[0]
        : "",
      email: student.email || "",
      phone: student.phone || "",
      address: student.address || "",
      status: student.status || "Active",
    });
    setShowForm(true);
  };

  // ✅ Reset form
  const resetForm = () => {
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
  };

  // ✅ Toast helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // ✅ Pagination controls
  const paginate = (pageNumber) => fetchStudents(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && fetchStudents(currentPage + 1);
  const prevPage = () =>
    currentPage > 1 && fetchStudents(currentPage - 1);

  if (loading)
    return <p className="text-center mt-5 fs-5 fw-semibold">Loading...</p>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold text-primary mb-3 text-center">Student List</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-success fw-semibold"
          onClick={() => {
            resetForm();
            setEditingStudentId(null);
            setShowForm(true);
          }}
        >
          ➕ Add New Student
        </button>

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            className="form-control"
            style={{ width: "180px" }}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchStudents(1)}
          />
          <button className="btn btn-primary ms-2" onClick={() => fetchStudents(1)}>
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
              <th>Action</th>
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
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-warning text-white"
                        onClick={() => handleEdit(s)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(s.studentID)}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
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

      {/* Pagination */}
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
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={nextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Add/Edit Student Modal */}
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
                <h5 className="modal-title fw-bold text-primary">
                  {editingStudentId ? "Edit Student" : "Add New Student"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowForm(false);
                    setEditingStudentId(null);
                  }}
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
                    onClick={() => {
                      setShowForm(false);
                      setEditingStudentId(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingStudentId ? "Update Student" : "Save Student"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`toast align-items-center text-white border-0 position-fixed bottom-0 end-0 m-4 bg-${
            toast.type === "success" ? "success" : "danger"
          } show`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ zIndex: 1056, minWidth: "250px" }}
        >
          <div className="d-flex">
            <div className="toast-body fw-semibold">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setToast({ show: false, message: "", type: "" })}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
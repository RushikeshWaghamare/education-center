import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [teachersPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const [newTeacher, setNewTeacher] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hireDate: "",
    departmentID: "",
  });

  // ✅ Fetch teachers with backend pagination
  const fetchTeachers = async (page = 1, updateUrl = true) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:44303/api/Teachers?pageNumber=${page}&pageSize=${teachersPerPage}&search=${encodeURIComponent(search)}`
      );
      if (!response.ok) throw new Error("Failed to fetch teachers");
      const data = await response.json();

      setTeachers(data.teachers);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);

      if (updateUrl) {
        const params = {};
        if (page > 1) params.page = page;
        if (search) params.search = search;
        setSearchParams(params);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers(pageFromUrl, false);
  }, []);

  // ✅ Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Add/Edit submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...newTeacher,
      firstName: newTeacher.firstName.trim(),
      lastName: newTeacher.lastName.trim() || null,
      email: newTeacher.email.trim() || null,
      phone: newTeacher.phone.trim() || null,
      hireDate: newTeacher.hireDate || null,
      departmentID: newTeacher.departmentID || null,
    };

    try {
      const url = editingTeacherId
        ? `https://localhost:44303/api/Teachers/${editingTeacherId}`
        : "https://localhost:44303/api/Teachers";

      const method = editingTeacherId ? "PUT" : "POST";

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

      await fetchTeachers(editingTeacherId ? currentPage : 1);
      showToast(
        editingTeacherId
          ? "Teacher updated successfully!"
          : "Teacher added successfully!",
        "success"
      );

      setShowForm(false);
      setEditingTeacherId(null);
      resetForm();
    } catch (error) {
      console.error("Error saving teacher:", error);
      showToast("Failed to save teacher.", "error");
    }
  };

  // ✅ Delete teacher
  const handleDelete = async (teacherID) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const response = await fetch(
        `https://localhost:44303/api/Teachers/${teacherID}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete teacher");

      await fetchTeachers(currentPage);
      showToast("Teacher deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting teacher:", error);
      showToast("Failed to delete teacher.", "error");
    }
  };

  // ✅ Edit teacher
  const handleEdit = (teacher) => {
    setEditingTeacherId(teacher.teacherID);
    setNewTeacher({
      firstName: teacher.firstName || "",
      lastName: teacher.lastName || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      hireDate: teacher.hireDate ? teacher.hireDate.split("T")[0] : "",
      departmentID: teacher.departmentID || "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setNewTeacher({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      hireDate: "",
      departmentID: "",
    });
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const paginate = (pageNumber) => fetchTeachers(pageNumber);
  const nextPage = () => currentPage < totalPages && fetchTeachers(currentPage + 1);
  const prevPage = () => currentPage > 1 && fetchTeachers(currentPage - 1);

  if (loading)
    return <p className="text-center mt-5 fs-5 fw-semibold">Loading...</p>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold text-primary mb-3 text-center">Teacher List</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-success fw-semibold"
          onClick={() => {
            resetForm();
            setEditingTeacherId(null);
            setShowForm(true);
          }}
        >
          ➕ Add New Teacher
        </button>

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            className="form-control"
            style={{ width: "180px" }}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchTeachers(1)}
          />
          <button className="btn btn-primary ms-2" onClick={() => fetchTeachers(1)}>
            Search
          </button>
        </div>
      </div>

      {/* Teacher Table */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover table-bordered align-middle text-center mb-0">
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Hire Date</th>
              <th>Department ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length ? (
              teachers.map((t) => (
                <tr key={t.teacherID}>
                  <td>{t.firstName}</td>
                  <td>{t.lastName}</td>
                  <td>{t.email}</td>
                  <td>{t.phone}</td>
                  <td>{t.hireDate ? new Date(t.hireDate).toLocaleDateString("en-GB") : "-"}</td>
                  <td>{t.departmentID || "-"}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-warning text-white"
                        onClick={() => handleEdit(t)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(t.teacherID)}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
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
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={nextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Add/Edit Teacher Modal */}
      {showForm && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-primary">
                  {editingTeacherId ? "Edit Teacher" : "Add New Teacher"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTeacherId(null);
                  }}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    {[
                      { label: "First Name", name: "firstName", type: "text", required: true },
                      { label: "Last Name", name: "lastName", type: "text", required: true },
                      { label: "Email", name: "email", type: "email", required: true },
                      { label: "Phone", name: "phone", type: "text", required: false },
                      { label: "Hire Date", name: "hireDate", type: "date", required: false },
                      { label: "Department ID", name: "departmentID", type: "number", required: false },
                    ].map((field) => (
                      <div className="col-md-6" key={field.name}>
                        <label className="form-label">{field.label}</label>
                        <input
                          type={field.type}
                          className="form-control"
                          name={field.name}
                          value={newTeacher[field.name]}
                          onChange={handleChange}
                          required={field.required}
                        />
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
                      setEditingTeacherId(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingTeacherId ? "Update Teacher" : "Save Teacher"}
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
          className={`toast align-items-center text-white border-0 position-fixed bottom-0 end-0 m-4 bg-${toast.type === "success" ? "success" : "danger"} show`}
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

export default TeacherList;
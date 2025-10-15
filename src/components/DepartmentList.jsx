import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [departmentsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const [newDepartment, setNewDepartment] = useState({
    departmentName: "",
    description: "",
  });

  // ✅ Fetch departments with backend pagination
  const fetchDepartments = async (page = 1, updateUrl = true) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:44303/api/Departments?pageNumber=${page}&pageSize=${departmentsPerPage}&search=${encodeURIComponent(
          search
        )}`
      );
      if (!response.ok) throw new Error("Failed to fetch departments");

      const data = await response.json();

      setDepartments(data.departments);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);

      if (updateUrl) {
        const params = {};
        if (page > 1) params.page = page;
        if (search) params.search = search;
        setSearchParams(params);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments(pageFromUrl, false);
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle add / edit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      departmentName: newDepartment.departmentName.trim(),
      description: newDepartment.description.trim(),
    };

    try {
      const url = editingDepartmentId
        ? `https://localhost:44303/api/Departments/${editingDepartmentId}`
        : "https://localhost:44303/api/Departments";

      const method = editingDepartmentId ? "PUT" : "POST";

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

      await fetchDepartments(editingDepartmentId ? currentPage : 1);
      showToast(
        editingDepartmentId
          ? "Department updated successfully!"
          : "Department added successfully!",
        "success"
      );

      setShowForm(false);
      setEditingDepartmentId(null);
      resetForm();
    } catch (error) {
      console.error("Error saving department:", error);
      showToast("Failed to save department.", "error");
    }
  };

  // ✅ Delete Department
  const handleDelete = async (departmentID) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;

    try {
      const response = await fetch(
        `https://localhost:44303/api/Departments/${departmentID}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete department");

      await fetchDepartments(currentPage);
      showToast("Department deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting department:", error);
      showToast("Failed to delete department.", "error");
    }
  };

  // ✅ Edit handler
  const handleEdit = (department) => {
    setEditingDepartmentId(department.departmentID);
    setNewDepartment({
      departmentName: department.departmentName || "",
      description: department.description || "",
    });
    setShowForm(true);
  };

  // ✅ Reset form
  const resetForm = () => {
    setNewDepartment({
      departmentName: "",
      description: "",
    });
  };

  // ✅ Toast helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // ✅ Pagination
  const paginate = (pageNumber) => fetchDepartments(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && fetchDepartments(currentPage + 1);
  const prevPage = () =>
    currentPage > 1 && fetchDepartments(currentPage - 1);

  if (loading)
    return <p className="text-center mt-5 fs-5 fw-semibold">Loading...</p>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold text-primary mb-3 text-center">
        Department List
      </h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-success fw-semibold"
          onClick={() => {
            resetForm();
            setEditingDepartmentId(null);
            setShowForm(true);
          }}
        >
          ➕ Add New Department
        </button>

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            className="form-control"
            style={{ width: "180px" }}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchDepartments(1)}
          />
          <button className="btn btn-primary ms-2" onClick={() => fetchDepartments(1)}>
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover table-bordered align-middle text-center mb-0">
          <thead className="table-dark">
            <tr>
              <th>Department Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.length ? (
              departments.map((d) => (
                <tr key={d.departmentID}>
                  <td>{d.departmentName}</td>
                  <td>{d.description}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-warning text-white"
                        onClick={() => handleEdit(d)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(d.departmentID)}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
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

      {/* Add/Edit Modal */}
      {showForm && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-primary">
                  {editingDepartmentId ? "Edit Department" : "Add New Department"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowForm(false);
                    setEditingDepartmentId(null);
                  }}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Department Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="departmentName"
                      value={newDepartment.departmentName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={newDepartment.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowForm(false);
                      setEditingDepartmentId(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingDepartmentId ? "Update Department" : "Save Department"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
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

export default DepartmentList;
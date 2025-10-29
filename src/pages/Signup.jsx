import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/authService";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [roleId, setRoleId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  // 🔹 Auto-hide toast
  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
    return () => clearTimeout(t);
  }, [toast.show]);

  // 🔹 Step 1 → Role selection
  const handleRoleSelect = (selectedRoleId) => {
    setRoleId(selectedRoleId);
    setStep(2);
  };

  // 🔹 Step 2 → Basic info validation
  const handleNextToPassword = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setToast({ show: true, message: "Please fill all required fields", type: "danger" });
      return;
    }
    setStep(3);
  };

  // 🔹 Password validation regex
  const isValidPassword = (pwd) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    return pattern.test(pwd);
  };

  // 🔹 Final submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword(password)) {
      setToast({
        show: true,
        message:
          "Password must be at least 10 characters long and include uppercase, lowercase, number, and special character.",
        type: "danger",
      });
      return;
    }

    if (password !== confirmPassword) {
      setToast({ show: true, message: "Passwords do not match", type: "danger" });
      return;
    }

    try {
      await registerUser({ firstName, lastName, email, password, roleId });
      setToast({ show: true, message: "Registration successful! Redirecting to login...", type: "success" });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      const serverMessage =
        err?.response?.data?.message || err?.response?.data || err?.message || "Registration failed";
      setToast({ show: true, message: `Error: ${serverMessage}`, type: "danger" });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {/* Toast */}
      {toast.show && (
        <div
          className={`alert alert-${toast.type} alert-dismissible fade show`}
          role="alert"
          style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1080, minWidth: "260px" }}
        >
          {toast.message}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
          />
        </div>
      )}

      <div className="card shadow p-4">
        <h3 className="text-center mb-3">Sign Up</h3>
        <p className="text-center text-muted mb-4">Step {step} of 3</p>

        {/* 🔹 Step 1: Role Selection */}
        {step === 1 && (
          <>
            <p className="text-center mb-3">Choose your role to continue</p>
            <div className="d-flex flex-column gap-2">
              <button className="btn btn-outline-primary w-100" onClick={() => handleRoleSelect(1)}>
                Admin
              </button>
              <button className="btn btn-outline-primary w-100" onClick={() => handleRoleSelect(2)}>
                Faculty
              </button>
              <button className="btn btn-outline-primary w-100" onClick={() => handleRoleSelect(3)}>
                Student
              </button>
            </div>
          </>
        )}

        {/* 🔹 Step 2: Basic Info */}
        {step === 2 && (
          <>
            <p className="text-center text-muted mb-2">
              You are signing up as{" "}
              <strong>{roleId === 1 ? "Admin" : roleId === 2 ? "Faculty" : "Student"}</strong>
            </p>
            <form onSubmit={handleNextToPassword}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Next
                </button>
              </div>
            </form>
          </>
        )}

        {/* 🔹 Step 3: Password Setup */}
        {step === 3 && (
          <>
            <form onSubmit={handleSubmit}>
              <p className="text-center text-muted mb-2">Create a secure password</p>

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <small className="text-muted d-block mb-3">
                Password must be at least 10 characters long and include:
                <br />• One uppercase letter<br />• One lowercase letter<br />• One number<br />• One special character
              </small>

              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                  Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;

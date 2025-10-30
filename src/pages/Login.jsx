import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ From context

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
    return () => clearTimeout(t);
  }, [toast.show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser({ email, password });
      login(data.user); // ✅ Save user in context
      setToast({ show: true, message: "Logged in successfully!", type: "success" });
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setError("Invalid email or password");
      setToast({
        show: true,
        message: "Login failed. Please check your credentials.",
        type: "danger",
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
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

      <h3 className="text-center mb-3">Sign In</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-danger mb-2">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

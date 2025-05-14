import "./index.css";
import { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `https://e-commerce-backeend.onrender.com/api/auth/register`,
        formData
      );

      // ✅ Redirect to homepage or dashboard
      window.location.href = "/login";
    } catch (err) {
      console.error("Registration error", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="login-page">
      <form onSubmit={handleRegister}>
        <div className="login-container">
          <h2>Register</h2>

          <div className="input-group">
            <input
              className="input-field"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              className="input-field"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit">Register</button>

          <div className="register-link">
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;

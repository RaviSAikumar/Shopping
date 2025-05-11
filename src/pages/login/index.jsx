import "./index.css";
import { useState } from "react";
import axios from "axios";

function LoginPage({ isAuthenticated, setIsAuthenticated }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      console.log("Login successful", res.data);

      localStorage.setItem("token", res.data.token);

      // Redirect user
      window.location.href = "/";
    } catch (err) {
      console.error("Login error", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <div className="login-container">
          <h2>Login</h2>

          <div className="input-group">
            <input
              className="input-field"
              type="text"
              id="username"
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
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="register-link">
            <p>
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

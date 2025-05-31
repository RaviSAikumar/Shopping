import "./index.css";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
// const API = import.meta.env.VITE_API_BASE_URL;

function LoginPage() {
  const { setIsAuthenticated } = useContext(GlobalContext);
  const navigate = useNavigate();
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
        `https://e-commerce-backeend.onrender.com/api/auth/login`,
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsAuthenticated(true);

      navigate(res.data.user.role === "admin" ? "/adminpage" : "/");
    } catch (err) {
      console.error("Login error", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     // Use the API URL from .env file instead of hardcoding localhost
  //     const res = await axios.post(`${API}/api/auth/login`, formData);
  //     console.log("Login successful", res.data);

  //     // Save the token in localStorage for authentication
  //     localStorage.setItem("token", res.data.token);

  //     // Redirect to home page after successful login
  //     window.location.href = "/";
  //   } catch (err) {
  //     console.error("Login error", err);
  //     setError(err.response?.data?.message || "Login failed");
  //   }
  // };
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

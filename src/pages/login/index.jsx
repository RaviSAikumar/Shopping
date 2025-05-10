import "./index.css";

function LoginPage() {
  return (
    <div className="login-page">
      <form>
        <div className="login-container">
          <h2>Login</h2>
          <div className="input-group">
            <input
              className="input-field"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
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
              required
            />
          </div>
          <button type="submit">Login</button>

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

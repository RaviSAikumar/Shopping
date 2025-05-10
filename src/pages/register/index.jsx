import "./index.css";

function RegisterPage() {
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
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
            />
          </div>{" "}
          <div className="input-group">
            <input
              className="input-field"
              type="email"
              id="email"
              name="email"
              placeholder="email"
              required
            />
          </div>
          <button type="submit">Login</button>
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

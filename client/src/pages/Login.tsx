import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = login(email, password);

    if (success) {
      setError("");
      navigate("/", { replace: true });
    } else {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <h1 id="login-title">Welcome Back</h1>

        <p>
          Sign in to access the India.gov.in Accessibility Audit Dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>

            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="demo-credentials">
          <h2>Demo Credentials</h2>
          <p>Email: admin@indiagov.in</p>
          <p>Password: admin123</p>
        </div>
      </section>
    </main>
  );
}

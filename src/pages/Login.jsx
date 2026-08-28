import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // IMPORTANT
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Check token
      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("token")
      );

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        "Cannot connect to backend. Make sure backend is running."
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>BlogHub</h1>

        <h2>Welcome Back!</h2>

        <p>
          Login to continue to your account.
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="primary-button full"
          >
            Login
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account?

          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;
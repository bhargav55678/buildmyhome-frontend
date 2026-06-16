import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

      alert("Login Successful");

      navigate("/dashboard");
    }catch (error) {
  console.log(error);

  alert(
    JSON.stringify(error.response?.data) ||
    error.message
  );
}
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">🏠</div>

        <h1>BuildMyHome</h1>

        <p className="subtitle">
          Build, Track & Manage Construction Projects
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="register-text">
          Don't have an account?{" "}
          <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
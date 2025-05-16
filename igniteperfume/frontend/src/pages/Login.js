import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    // ✅ Input validation before sending request
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        className="form-control my-2"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="form-control my-2"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button className="btn btn-primary w-100" onClick={login}>Login</button>
    </div>
  );
};

export default Login;

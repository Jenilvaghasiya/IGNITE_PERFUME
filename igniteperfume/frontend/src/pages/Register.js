import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const register = async () => {
    await axios.post("http://localhost:5000/api/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <input className="form-control my-2" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="form-control my-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="form-control my-2" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select className="form-control my-2" onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button className="btn btn-success" onClick={register}>Register</button>
    </div>
  );
};

export default Register;

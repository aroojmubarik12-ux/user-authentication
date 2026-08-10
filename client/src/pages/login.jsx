import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault(); // 1. Sabse pehle form reload hone se roken

    try {
      const res = await axios.post("http://localhost:8000/login", user);

      console.log("Response:", res.data);
      toast.success("User logged in successfully");

      // 2. Correct route par navigate karein (e.g. Home ya Dashboard)
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.msg || "Login failed");
    }
  }

  return (
    <div>
      <div className="w-50 mx-auto">
        <h2>Login here</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="jhon@gmail.com"
              value={user.email}
              onChange={changeHandler}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="*******"
              value={user.password}
              onChange={changeHandler}
              required
            />
          </Form.Group>

          <Button type="submit" variant="success">
            Login
          </Button>
          <p className="mt-2">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const navigate = useNavigate();

  async function submitHandler(e) {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:8000/register", user);
      console.log(user);
      toast.success("user registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed");
      console.log(error);
    }
  }

  return (
    <div className="w-50 mx-auto">
      <h2>Create Account</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="jhon"
            value={user.firstName}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="doe"
            value={user.lastName}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="jhon@gmail.com"
            value={user.email}
            onChange={changeHandler}
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
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Register
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;

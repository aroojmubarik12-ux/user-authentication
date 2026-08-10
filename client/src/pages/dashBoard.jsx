import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Welcome to Dashboard 🎉</h2>
      <p className="mt-3">Aap successfully log in ho chuke hain.</p>

      <Button variant="danger" className="mt-3" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;

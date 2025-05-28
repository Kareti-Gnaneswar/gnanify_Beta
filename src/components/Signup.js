import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      navigate("/"); // go to homepage after signup
    } else {
      setMessage(result.error || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Signup</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <style jsx="true">{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f9;
        }

        .auth-form {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .auth-form h2 {
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: 600;
        }

        .auth-form input {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }

        .auth-form button {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        .auth-form button:hover {
          background-color: #0056b3;
        }

        .message {
          color: #f00;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}

export default Signup;

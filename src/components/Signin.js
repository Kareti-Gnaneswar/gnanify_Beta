import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // adjust path if needed

function Signin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Get login from context

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        const result = await login(email, password);
        if (result.success) {
            setMessage('Login successful!');
            navigate("/");
        } else {
            setMessage(result.error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Signin</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Signin</button>
                </form>
                {message && <p className="message">{message}</p>}
                <p className="signup-link">
                    Don't have an account yet? <span onClick={() => navigate("/signup")}>Sign up here</span>
                </p>
            </div>

            {/* Keep your CSS styling here */}
        </div>
    );
}

export default Signin;

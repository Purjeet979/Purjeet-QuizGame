import React, { useState } from 'react';
import { registerUser } from '@/utils/authService';
import { useNavigate } from 'react-router-dom';
import './FloatingParticles.css';


const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); // <-- ADD THIS STATE
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ username, password, email });
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                // This will display backend errors like "Username is already taken!"
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="auth-container">
            <div id="particle-container">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>
            <div className="auth-card">
                <h2>Register</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleRegistration}>
                    {/* --- ADD THE EMAIL INPUT FIELD BELOW --- */}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* --- END OF NEW CODE --- */}

                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
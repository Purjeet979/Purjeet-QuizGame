import React, { useState } from 'react';
import { loginUser } from '../../utils/authService';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './FloatingParticles.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ username, password });
            navigate('/');
            window.location.reload();
        } catch (error) {
            setErrorMessage('Invalid username or password');
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
                <h2>Login</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                {/* --- "Forgot Password" Link Added Below --- */}
                <div className="text-center mt-3">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                 {/* --- End of Added Code --- */}
            </div>
        </div>
    );
};

export default Login;
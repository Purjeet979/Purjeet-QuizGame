import React, { useState } from 'react';
import { forgotPassword } from '../../utils/authService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await forgotPassword(email);
            setMessage(response);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Forgot Password</h2>
                <p>Enter your email address to receive a password reset link.</p>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
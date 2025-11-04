import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../utils/authService';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setMessage('Invalid or missing reset token.');
            return;
        }
        try {
            const response = await resetPassword(token, newPassword);
            setMessage(response);
            setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
        } catch (error) {
            setMessage('An error occurred. The token may be invalid or expired.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Reset Your Password</h2>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
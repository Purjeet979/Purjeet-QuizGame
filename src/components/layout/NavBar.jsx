import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isUserLoggedIn, logout, getUserRoles, getUsername } from '@/utils/authService'; // Using path alias
import { FaBrain } from "react-icons/fa";

const NavBar = () => {
    const isLoggedIn = isUserLoggedIn();
    const userRoles = getUserRoles();
    const navigate = useNavigate();
    const [isIconAnimating, setIsIconAnimating] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (isLoggedIn) {
            setUsername(getUsername());
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        logout();
        navigate('/');
        window.location.reload();
    };

    const handleIconClick = () => {
        setIsIconAnimating(true);
        setTimeout(() => setIsIconAnimating(false), 500);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-4 shadow mt-5 sticky-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <FaBrain 
                        className={`me-2 ${isIconAnimating ? 'icon-animate' : ''}`} 
                        onClick={handleIconClick}
                        style={{cursor: 'pointer'}}
                    />
                    PrepGuru
                </NavLink>

                {/* --- This is the new Hamburger Button --- */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarContent" 
                    aria-controls="navbarContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* --- End of Hamburger Button --- */}

                {/* This div now wraps all the links and makes them collapsible */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isLoggedIn && userRoles.includes("ROLE_ADMIN") && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin">Admin</NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/quiz-stepper">Take Quiz</NavLink>
                        </li>
                        {isLoggedIn && userRoles.includes("ROLE_STUDENT") && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/student-dashboard">My Dashboard</NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link" style={{ color: 'white' }}>Hi, {username}!</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Register</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;


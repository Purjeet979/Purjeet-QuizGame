import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import './Home.css';
import robotImage from '../assets/image/robot-static.png'; // <-- Adjust path to your robot image

const Home = () => {
    const [isWaving, setIsWaving] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const handleRobotClick = () => {
        setIsWaving(true); // Start waving animation
        setShowMessage(true); // Show "Hi!" message

        // Stop waving after 1.5 seconds
        setTimeout(() => setIsWaving(false), 1500); 
        
        // Hide message after 2 seconds
        setTimeout(() => setShowMessage(false), 2000); 
    };

    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1 className="hero-title">
                    Welcome to PrepGuru
                </h1>
                <p className="hero-subtitle">
                    Create, share, and play engaging quizzes. The ultimate platform for students and educators to make learning fun.
                </p>
                <Link to="/quiz-stepper" className="btn btn-primary btn-lg hero-button">
                    Get Started
                </Link>
            </div>

            {/* Robot Container */}
            <div className="robot-container" onClick={handleRobotClick}>
                <img
                    src={robotImage}
                    alt="Friendly Robot"
                    className={`robot-sticker ${isWaving ? 'wave-animation' : ''}`}
                />
                {showMessage && (
                    <div className="robot-speech-bubble">
                        Hi!
                    </div>
                )}
            </div>
            
            <div className="hero-shape-blob"></div>
            <div className="hero-shape-blob two"></div>
        </div>
    );
};

export default Home;
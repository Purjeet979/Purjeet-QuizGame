import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './QuizResult.css';
import ReactConfetti from 'react-confetti';

const QuizResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalScores, numQuestions } = location.state;
    const percentage = numQuestions > 0 ? Math.round((totalScores / numQuestions) * 100) : 0;

    const getRating = (percent) => {
        if (percent >= 90) return "Excellent";
        if (percent >= 75) return "Good";
        if (percent >= 50) return "Average";
        return "Try Again";
    };

    return (
        <div className="result-page-container">
            {percentage >= 90 && <ReactConfetti />}
            <h1 className="result-title">Test Complete!</h1>
            <p className="result-subtitle">Well done, you've finished the quiz.</p>

            <div className="result-card">
                <h3 className="result-card-title">Quiz Results</h3>
                
                <div className="progress-bar-container">
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                            rotation: 0.25,
                            strokeLinecap: 'butt',
                            textSize: '18px',
                            pathTransitionDuration: 0.5,
                            pathColor: `rgba(13, 110, 253, ${percentage / 100})`, // Blue path color
                            textColor: '#ffffff',
                            trailColor: '#1a1a2e',
                            backgroundColor: '#0d6efd',
                        })}
                    />
                    <p className="rating-text">{getRating(percentage)}</p>
                </div>

                <div className="stat-grid two-cols"> {/* Changed class to two-cols */}
                    <div className="stat-box">
                        <p className="stat-label">Correct Answers</p>
                        <h4 className="stat-value">{totalScores} / {numQuestions}</h4>
                    </div>
                    <div className="stat-box">
                        <p className="stat-label">Accuracy</p>
                        <h4 className="stat-value">{percentage.toFixed(2)}%</h4>
                    </div>
                </div>
            </div>

            <div className="action-buttons">
                <button className="btn-result retake" onClick={() => navigate("/quiz-stepper")}>Retake Test</button>
                <button className="btn-result dashboard" onClick={() => navigate("/student-dashboard")}>Dashboard</button>
                <button className="btn-result home" onClick={() => navigate("/")}>Home</button>
            </div>
        </div>
    );
};

export default QuizResult;
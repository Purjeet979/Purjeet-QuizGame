import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../utils/QuizService';

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const data = await getLeaderboard();
            // Group the flat data by subject
            const groupedData = data.reduce((acc, item) => {
                (acc[item.subject] = acc[item.subject] || []).push(item);
                return acc;
            }, {});
            setLeaderboardData(groupedData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading leaderboard...</p>;
    }

    return (
        <div className="container mt-5 leaderboard-container">
            <h2 className="mb-4">Leaderboard by Subject</h2>
            <div className="row">
                {Object.keys(leaderboardData).map(subject => (
                    <div key={subject} className="col-md-6 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">{subject}</h4>
                            </div>
                            <div className="card-body">
                                <ol className="list-group list-group-flush">
                                    {leaderboardData[subject].map((entry, index) => (
                                        <li key={entry.username} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <strong className="me-2">{index + 1}.</strong> {entry.username}
                                            </span>
                                            <span className="badge bg-primary rounded-pill">
                                                {entry.averageScore.toFixed(2)}%
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
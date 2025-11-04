import React, { useState, useEffect } from 'react';
import { getQuizHistory } from '../utils/quizService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StudentDashboard = () => {
    const [history, setHistory] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("All"); // Default to show all
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const data = await getQuizHistory();
            setHistory(data);

            // Get a unique list of subjects from the history
            const uniqueSubjects = ["All", ...new Set(data.map(item => item.subject))];
            setSubjects(uniqueSubjects);
            
            processChartData(data, "All"); // Initially process data for all subjects

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    // Function to process data based on the selected subject
    const processChartData = (data, subject) => {
        const filteredData = subject === "All" ? data : data.filter(item => item.subject === subject);
        
        const processedData = filteredData.map(result => ({
            date: new Date(result.dateTaken).toLocaleDateString(),
            score: Math.round((result.score / result.totalNumberOfQuestions) * 100)
        })).reverse();
        
        setChartData(processedData);
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
        processChartData(history, e.target.value); // Re-process chart data on change
    };

    if (loading) {
        return <p>Loading your progress...</p>;
    }

    // Filter the table data based on the selected subject as well
    const filteredTableData = selectedSubject === "All" ? history : history.filter(item => item.subject === selectedSubject);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Progress Dashboard</h2>
                {/* --- Subject Filter Dropdown --- */}
                <div className="col-md-3">
                    <select className="form-select" value={selectedSubject} onChange={handleSubjectChange}>
                        {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            {history.length > 0 ? (
                <>
                    <div className="chart-container mb-5">
                        <h4 className="mb-4 text-center">Performance Over Time for: {selectedSubject}</h4>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#373752" />
                                <XAxis dataKey="date" stroke="#e0e0e0" />
                                <YAxis domain={[0, 100]} stroke="#e0e0e0" />
                                <Tooltip
                                    contentStyle={{ 
                                        backgroundColor: '#16213e', 
                                        border: '1px solid #4a4a5e' 
                                    }} 
                                    labelStyle={{ color: '#ffffff' }}
                                    itemStyle={{ color: '#0d6efd' }}
                                    formatter={(value) => `${value.toFixed(0)}%`}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="score" name="Score %" stroke="#0d6efd" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <h4 className="mb-4 text-center">Detailed History for: {selectedSubject}</h4>
                    <table className="table dashboard-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Score</th>
                                <th>Total Questions</th>
                                <th>Date Taken</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTableData.map((result) => (
                                <tr key={result.id}>
                                    <td>{result.subject}</td>
                                    <td>{result.score}</td>
                                    <td>{result.totalNumberOfQuestions}</td>
                                    <td>{new Date(result.dateTaken).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                 <p className="text-center">You haven't taken any quizzes yet. Your progress will appear here once you do!</p>
            )}
        </div>
    );
};

export default StudentDashboard;

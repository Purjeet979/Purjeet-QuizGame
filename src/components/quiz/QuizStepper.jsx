import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "@/utils/QuizService";

const QuizStepper = () => {
    const [selectedSubject, setSelectedSubject] = useState("");
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSubjectData();
    }, []);

    const fetchSubjectData = async () => {
        try {
            const subjectsData = await getSubjects();
            setSubjects(subjectsData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStartQuiz = () => {
        if (selectedSubject) {
            navigate("/take-quiz", { state: { numQuestions: 10, selectedSubject } });
        } else {
            alert("Please select a subject.");
        }
    };

    return (
        <section className="quiz-stepper-container">
            <div className="stepper-card">
                <h1 className="stepper-title">Choose Your Challenge</h1>
                <p className="stepper-subtitle">Select a subject to begin your 10-question quiz.</p>

                <div className="subject-selector-wrapper">
                    <select
                        className="form-select"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}>
                        <option value="">Select a subject...</option>
                        {subjects.map((subject) => (
                            <option key={subject} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="btn btn-primary btn-lg start-quiz-btn"
                    onClick={handleStartQuiz}
                    disabled={!selectedSubject}>
                    Start Quiz
                </button>
            </div>
        </section>
    );
};

export default QuizStepper;
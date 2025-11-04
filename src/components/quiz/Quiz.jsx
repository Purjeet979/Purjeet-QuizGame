import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchQuizForUser, getAiHint, saveQuizResult } from "../../utils/QuizService";
import AnswerOptions from "./AnswerOptions";
import { FaSpinner } from "react-icons/fa";

const Quiz = () => {
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [totalScores, setTotalScores] = useState(0);
    const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds

    const [hint, setHint] = useState("");
    const [isLoadingHint, setIsLoadingHint] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { selectedSubject, numQuestions } = location.state;

    // Memoize handleSubmit to stabilize the timer's useEffect dependency
    const handleSubmit = useCallback(async () => {
        let scores = 0;
        quizQuestions.forEach((question) => {
            const selectedAnswer = selectedAnswers[question.id];
            
            if (selectedAnswer) {
                const correctAnswers = Array.isArray(question.correctAnswers) ? question.correctAnswers : [question.correctAnswers];
                const userAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer];
                const isCorrect = JSON.stringify([...correctAnswers].sort()) === JSON.stringify([...userAnswers].sort());
                if (isCorrect) {
                    scores++;
                }
            }
        });

        const resultData = {
            score: scores,
            totalNumberOfQuestions: quizQuestions.length,
            subject: selectedSubject 
        };

        try {
            await saveQuizResult(resultData);
        } catch (error) {
            console.error("Failed to save quiz result:", error);
        }
        
        navigate("/quiz-result", { state: { totalScores: scores, numQuestions: quizQuestions.length } });
    }, [quizQuestions, selectedAnswers, selectedSubject, navigate]);


    useEffect(() => {
        const fetchQuizData = async () => {
            if (numQuestions && selectedSubject) {
                const questions = await fetchQuizForUser(numQuestions, selectedSubject);
                setQuizQuestions(questions);
            }
        };
        fetchQuizData();
    }, [numQuestions, selectedSubject]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    handleSubmit();
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [handleSubmit]);

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer.charAt(0),
        }));
    };

    const handleCheckboxChange = (questionId, choice) => {
        setSelectedAnswers((prevAnswers) => {
            const existingAnswers = prevAnswers[questionId] ? [...prevAnswers[questionId]] : [];
            const choiceChar = choice.charAt(0);
            
            if (existingAnswers.includes(choiceChar)) {
                return {
                    ...prevAnswers,
                    [questionId]: existingAnswers.filter((a) => a !== choiceChar),
                };
            } else {
                return {
                    ...prevAnswers,
                    [questionId]: [...existingAnswers, choiceChar],
                };
            }
        });
    };

    const handleNextQuestion = () => {
        setHint(""); 
        setIsLoadingHint(false); 
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePreviousQuestion = () => {
        setHint(""); 
        setIsLoadingHint(false); 
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    
    const handleGetHint = async () => {
        if (!quizQuestions[currentQuestionIndex]) return; 
        const currentQ = quizQuestions[currentQuestionIndex];
        setIsLoadingHint(true);
        setHint("");
        const fetchedHint = await getAiHint(currentQ.question, currentQ.choices);
        setHint(fetchedHint);
        setIsLoadingHint(false);
    };

    if (quizQuestions.length === 0) {
        return <p>Loading quiz questions...</p>;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (!currentQuestion) {
        return <p>Loading question...</p>;
    }
    
    // --- PROGRESS BAR CALCULATION ---
    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    // --- END CALCULATION ---

    const isChecked = (choice) => {
        const currentSelected = selectedAnswers[currentQuestion.id];
        if (!currentSelected) {
            return false;
        }
        const choiceChar = choice.charAt(0);

        if (Array.isArray(currentSelected)) {
            return currentSelected.includes(choiceChar);
        }
        return currentSelected === choiceChar;
    };

    return (
        <div className="container p-5">
             
             {/* --- PROGRESS BAR ADDED BACK --- */}
             <div className="progress-container">
                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
             </div>
             {/* --- END OF PROGRESS BAR --- */}

             <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-info">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </h3>
                <h4 className="text-danger">Time Remaining: {formatTime(timer)}</h4>
            </div>

            <h5 className="mb-4">{currentQuestion.question}</h5>

            <AnswerOptions
                 question={currentQuestion}
                 isChecked={isChecked}
                 handleAnswerChange={handleAnswerChange}
                 handleCheckboxChange={handleCheckboxChange}
            />

            <div className="mt-4">
                <button className="btn btn-outline-info btn-sm" onClick={handleGetHint} disabled={isLoadingHint}>
                    {isLoadingHint ? <FaSpinner className="fa-spin" /> : "🤖 Get a Hint"}
                </button>
            </div>

            {hint && (
                <div className="alert alert-info mt-3" role="alert">
                    <strong>Hint:</strong> {hint}
                </div>
            )}

            <div className="mt-4">
                <button
                    className="btn btn-primary me-2"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}>
                    Previous
                </button>
                <button
                    className="btn btn-info"
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswers[currentQuestion.id]}>
                    {currentQuestionIndex === quizQuestions.length - 1 ? "Submit" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default Quiz;


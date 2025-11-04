import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuizStepper from "./components/quiz/QuizStepper";
import Quiz from "./components/quiz/Quiz";
import QuizResult from "./components/quiz/QuizResult";
import GetAllQuiz from "./components/quiz/GetAllQuiz";
import AddQuestion from "./components/question/AddQuestion";
import UpdateQuestion from "./components/question/UpdateQuestion";
import Navbar from "./components/layout/NavBar";
import Admin from "./components/Admin";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // <-- Add this import
import './App.css';
import StudentDashboard from "./components/StudentDashboard";
import Leaderboard from "./components/Leaderboard";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
    return (
        <main className="container mt-5 mb-5">
            <Router>
                
                <Navbar />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route
                        path="/admin"
                         element={
                         <ProtectedRoute roles={["ROLE_ADMIN"]}>
                            <Admin />
                         </ProtectedRoute>
                          }
                    />
                    <Route path="/quiz-result" element={<QuizResult />} />

                    {/* Protected Routes for any logged-in user */}
                    <Route
                        path="/quiz-stepper"
                        element={
                            <ProtectedRoute>
                                <QuizStepper />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/take-quiz"
                        element={
                            <ProtectedRoute>
                                <Quiz />
                            </ProtectedRoute>
                        }
                    />

                    {/* Protected Routes for ADMIN only */}
                    <Route
                        path="/create-quiz"
                        element={
                            <ProtectedRoute roles={["ROLE_ADMIN"]}>
                                <AddQuestion />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/all-quizzes"
                        element={
                            <ProtectedRoute roles={["ROLE_ADMIN"]}>
                                <GetAllQuiz />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/update-quiz/:id"
                        element={
                            <ProtectedRoute roles={["ROLE_ADMIN"]}>
                                <UpdateQuestion />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route 
                        path="/leaderboard" 
                        element={
                            <ProtectedRoute roles={["ROLE_ADMIN"]}>
                            <Leaderboard />
                            </ProtectedRoute>
                        } 
                    />

                    <Route 
                         path="/student-dashboard" 
                         element={
                             <ProtectedRoute>
                                 <StudentDashboard />
                            </ProtectedRoute>
                         } 
                    />
                    
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />


                </Routes>
            </Router>
        </main>
    );
}

export default App;
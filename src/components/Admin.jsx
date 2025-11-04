import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <section className="container mt-5">
            <h2 className="mt-5">Welcome to the Admin Dashboard</h2>
            <hr />
            <nav className="nav flex-column">
                <Link to={"/create-quiz"} className="nav-link">
                    Create a New Quiz
                </Link>
                <Link to={"/all-quizzes"} className="nav-link">
                    Manage Existing Quizzes
                </Link>
                <Link to={"/leaderboard"} className="nav-link">
                    View Leaderboard
                </Link>
            </nav>
        </section>
    )
}

export default Admin

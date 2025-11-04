PrepGuru - Full-Stack AI-Powered Quiz Platform

(Please add a screenshot of your project homepage named prepguru-home.png to the project's root folder)

PrepGuru is a modern, full-stack quiz application built with a React frontend and a Spring Boot backend. It provides a secure, role-based platform for both students and administrators.

Students can register, log in, and test their knowledge with timed quizzes on various subjects. They can track their long-term performance on a personal dashboard, complete with charts and a detailed history.

Admins have a secure dashboard where they can manage all quiz questions and view a student leaderboard. This project also features AI integration, offering students real-time hints from the Google Gemini API during their quiz.

✨ Key Features

👨‍🎓 For Students

Secure Authentication: Full registration, login, and "Forgot Password" functionality.

Student Dashboard: A private dashboard showing quiz history and a line chart of performance over time.

Quiz Stepper: A user-friendly interface to select a subject before starting.

Timed Quizzes: A 30-minute countdown timer that auto-submits the quiz.

AI-Powered Hints: A "Get a Hint" button on the quiz page that calls the Google Gemini API to provide a helpful hint without giving away the answer.

Gamified Results: A visually appealing results page showing the final score with a circular progress bar and an accuracy percentage.

Dynamic UI: A responsive, animated frontend with floating elements, hover effects, and a dark theme.

👩‍💼 For Admins

Role-Based Security: Admin-only pages are protected on both the frontend (with ProtectedRoute) and the backend (with Spring Security).

Admin Dashboard: A central hub to access admin features.

Full CRUD Operations: Admins can Create, Read, Update, and Delete all quiz questions in the database.

Student Leaderboard: A dedicated page to view a ranked list of all students, grouped by quiz subject and average score.

🔐 Security & Core

JWT Authentication: The backend uses Spring Security with JSON Web Tokens (JWT) for stateless authentication.

Password Hashing: User passwords are securely hashed using BCryptPasswordEncoder.

Role-Based Authorization: The API is secured based on user roles (ROLE_ADMIN vs. ROLE_STUDENT).

CORS Configuration: Global CORS configuration on the backend to allow the React frontend to make requests.

Validation: Both frontend (HTML5) and backend (jakarta.validation) validation are implemented for user registration.

🚀 Tech Stack

Frontend (Client-Side)

React.js (Vite): A modern JavaScript library for building component-based user interfaces.

React Router: For client-side navigation and protected routes.

Axios: For making asynchronous HTTP requests to the Spring Boot backend.

Recharts: A powerful library used to create the line chart on the student dashboard.

react-circular-progressbar: Used for the gamified quiz result component.

Bootstrap & Custom CSS: For responsive layout and custom styling (dark theme, animations, etc.).

Backend (Server-Side)

Java & Spring Boot: A robust framework for creating stand-alone, production-grade RESTful APIs.

Spring Security: Used for end-to-end security, including JWT authentication and role-based authorization.

Spring Data JPA (Hibernate): For data persistence and communication with the database.

MySQL: The relational database used to store all application data.

Lombok: To reduce boilerplate code in Java models and services.

Maven: For project dependency management.

External APIs

Google Gemini API: An external AI service called by the backend to provide intelligent hints for quiz questions.

🏁 Getting Started

To run this project on your local machine, follow these steps.

Prerequisites

Java JDK 17+

Apache Maven

Node.js (v18+) & npm

MySQL Workbench or any other SQL client.

1. Backend Setup (Spring Boot)

Clone the Repository:

git clone [your-repo-url]


Open the Backend Project:
Open the root folder (e.g., PrepGuru) in your Java IDE (like IntelliJ or Eclipse).

Create the Database:

Open MySQL Workbench.

Run the following SQL command to create the database:

CREATE SCHEMA `quiz_online`;


Configure Application Properties:

Navigate to src/main/resources/application.properties.

Update the following properties with your local MySQL credentials, your Gemini API key, and your Gmail credentials for the email service:

# --- Database ---
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

# --- Gemini AI ---
gemini.api.key=YOUR_GOOGLE_GEMINI_API_KEY

# --- Email Sender ---
spring.mail.username=your-email@gmail.com
spring.mail.password=your-gmail-app-password


Run the Backend:

Find the PrepGuruApplication.java file and run it.

The server will start on http://localhost:9192. The first time it runs, Spring Data JPA will automatically create all the necessary tables in your quiz_online database.

2. Frontend Setup (React)

Navigate to the Client Folder:

cd quiz-online-client


Install Dependencies:

npm install


Run the Frontend:

npm run dev

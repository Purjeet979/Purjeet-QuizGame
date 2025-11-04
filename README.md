# 🧠 PrepGuru - AI-Powered Quiz Platform

PrepGuru is a full-stack, secure, and dynamic web application that reinvents the quiz experience. Built for both students and administrators, it features a complete authentication system, role-based dashboards, and AI-powered hints from the Google Gemini API.



---

## ✨ Key Features

* **Secure Authentication:** Full registration, login, and "Forgot Password" email functionality.
* **Role-Based Dashboards:** The application provides two distinct experiences:
    * **Student:** Can take quizzes, get AI hints, and view a personal dashboard with a progress chart.
    * **Admin:** Can access a secure dashboard to create/edit/delete questions and view a site-wide leaderboard.
* **AI-Powered Hints:** Connected to the Google Gemini API to provide students with real-time hints that help them learn without giving away the answer.
* **Timed Quizzes:** All quizzes are set to a 30-minute timer with a progress bar to create a challenging, gamified experience.
* **Dynamic Visuals:** A fully responsive interface with a dark-mode theme, custom animations, animated backgrounds, and interactive charts for data visualization.

## 💻 Tech Stack

* **Backend:** Java, Spring Boot, Spring Security (JWT), Spring Data JPA, Maven
* **Frontend:** React.js (Vite), React Router, Axios, Recharts, Bootstrap
* **Database:** MySQL
* **External APIs:** Google Gemini API (for AI hints), Spring Mail (for password reset)

## 🚀 Getting Started

This is a full-stack application with a separate backend and frontend. You will need to run both to use the application.

### 1. Backend (Spring Boot)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/PrepGuru.git](https://github.com/YourUsername/PrepGuru.git)
    ```
2.  **Navigate to the backend directory:**
    ```bash
    cd PrepGuru
    ```
3.  **Create the Database:**
    * Open MySQL Workbench and create a new schema named `quiz_online`.
4.  **Configure the Backend:**
    * Open the `src/main/resources/application.properties` file.
    * Update `spring.datasource.username` and `spring.datasource.password` with your MySQL credentials.
    * Add your Google Gemini API key: `gemini.api.key=YOUR_API_KEY`
    * Add your Gmail credentials for the email service: `spring.mail.username=...` and `spring.mail.password=...`
5.  **Run the Backend:**
    * Open the project in your Java IDE (like IntelliJ) and run the `PrepGuruApplication.java` file.
    * The server will start on `http://localhost:9192`.

### 2. Frontend (React)

1.  **Navigate to the project directory:**
    ```bash
    cd quiz-online-client
    ```
2.  **Install all necessary packages:**
    ```bash
    npm install
    ```
3.  **Run the application:**
    ```bash
    npm run dev
    ```

## 🧑‍💻 Creator

* **Purjeet Shahu** - [Link to your GitHub Profile or LinkedIn (Optional)]


## 🙏 Acknowledgments

* Inspiration from various online quiz platforms.
* Gratitude to the creators of the Spring Boot and React frameworks.

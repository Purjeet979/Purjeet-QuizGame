import axios from "axios";
import { getToken } from "./authService"; // Import the helper function

export const api = axios.create({
    baseURL: "http://localhost:9192/api/quizzes"
});

// Add a request interceptor to include the token
api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// ... the rest of your functions (createQuestion, getAllQuestions, etc.) remain the same ...
export const createQuestion = async(quizQuestion) =>{
  try {
    const response = await api.post("/create-new-question", quizQuestion)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllQuestions = async() =>{
  try {
    const response = await api.get("/all-questions")
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchQuizForUser = async(number, subject) =>{
  try {
    const response = await api.get(
			`/quiz/fetch-questions-for-user?numberOfQuestions=${number}&subject=${subject}`
		)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getSubjects = async() =>{
  try {
    const response = await api.get("/subjects")
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const updateQuestion = async(id, question) =>{
  try {
    const response = await api.put(`/question/${id}/update`, question)
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const getQuestionById = async(id) =>{
  try {
    const response = await api.get(`/question/${id}`)
		return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteQuestion = async(id) =>{
  try {
    const response = await api.delete(`/question/${id}/delete`)
		return response.data
  } catch (error) {
    console.error(error)
  }
}


// Add these two functions to quizService.jsx

export const saveQuizResult = async (resultData) => {
    try {
        // Note: We are using a different base URL for this
        const response = await axios.post("http://localhost:9192/api/results", resultData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error saving quiz result:", error);
    }
};

export const getQuizHistory = async () => {
    try {
        const response = await axios.get("http://localhost:9192/api/results/my-history", {
             headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching quiz history:", error);
        return [];
    }
};

// Add this function to quizService.jsx
export const getLeaderboard = async () => {
    try {
        const response = await axios.get("http://localhost:9192/api/results/leaderboard", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return [];
    }
};

const aiApi = axios.create({
    baseURL: "http://localhost:9192/api/ai"
});

// Add an interceptor to send the token with AI requests
aiApi.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getAiExplanation = async (question, correctAnswer, userAnswer) => {
    try {
        const response = await aiApi.post("/explain", {
            question,
            correctAnswer,
            userAnswer
        });
        return response.data; // This will be the text string from Gemini
    } catch (error) {
        console.error("Error fetching AI explanation:", error);
        return "Sorry, I am unable to provide an explanation at this time.";
    }
};
// In quizService.jsx
export const getAiHint = async (question, choices) => {
    try {
        const response = await aiApi.post("/get-hint", { question, choices });
        return response.data;
    } catch (error) {
        console.error("Error fetching AI hint:", error);
        return "Sorry, a hint could not be generated.";
    }
};
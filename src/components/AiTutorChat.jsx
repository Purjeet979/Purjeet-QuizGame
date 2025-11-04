import React, { useState } from 'react';
import { getAiExplanation } from '@/utils/quizService';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

// This component will receive the question details as props
const AiTutorChat = ({ question, correctAnswer, userAnswer }) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleStartChat = async () => {
        setIsLoading(true);
        const explanation = await getAiExplanation(question, correctAnswer, userAnswer);

        setMessages([
            { from: 'user', text: "Can you please explain this question to me?" },
            { from: 'ai', text: explanation }
        ]);
        setIsLoading(false);
    };

    return (
        <div className="ai-chat-container mt-3">
            <button className="btn btn-outline-info btn-sm" onClick={handleStartChat} disabled={isLoading}>
                {isLoading ? <FaSpinner className="fa-spin" /> : "🤖 Explain this to me"}
            </button>

            {messages.length > 0 && (
                <div className="chat-window mt-2">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-bubble ${msg.from}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AiTutorChat;
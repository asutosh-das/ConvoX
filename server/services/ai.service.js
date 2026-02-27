import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const getAIResponse = async (prompt) => {
    try {
        if (!process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY) {
            return "Developer needs to set the GROQ_API_KEY in the environment.";
        }

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful AI assistant inside ConvoX, a dark theme modern chat app." }, { role: "user", content: prompt }],
            model: "llama-3.1-8b-instant",
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("AI Service Error:", error);
        return "Sorry, I am having trouble connecting to my brain right now.";
    }
};

export default getAIResponse;

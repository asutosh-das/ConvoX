import User from "../models/user.model.js";

const initializeAIUser = async () => {
    try {
        let aiUser = await User.findOne({ isAI: true });

        if (!aiUser) {
            aiUser = new User({
                fullName: "AI Assistant",
                username: "ai_assistant",
                profilePic: "https://avatar.iran.liara.run/public/job/designer?username=ai",
                isAI: true,
            });

            await aiUser.save();
            console.log("AI Assistant user seeded successfully");
        }
    } catch (error) {
        console.log("Error seeding AI User", error.message);
    }
};

export default initializeAIUser;

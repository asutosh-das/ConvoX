import User from "../models/user.model.js";

const initializeAIUser = async () => {
    try {
        let aiUser = await User.findOne({ isAI: true });

        if (!aiUser) {
            aiUser = new User({
                fullName: "ConvoX AI",
                username: "ai_assistant",
                profilePic: "https://api.dicebear.com/7.x/bottts/svg?seed=convoxai&backgroundColor=6366f1",
                isAI: true,
            });

            await aiUser.save();
            console.log("ConvoX AI user seeded successfully");
        } else if (aiUser.fullName !== "ConvoX AI") {
            // Update existing AI user name to ConvoX AI
            aiUser.fullName = "ConvoX AI";
            aiUser.profilePic = "https://api.dicebear.com/7.x/bottts/svg?seed=convoxai&backgroundColor=6366f1";
            await aiUser.save();
            console.log("AI user renamed to ConvoX AI");
        }
    } catch (error) {
        console.log("Error seeding AI User", error.message);
    }
};

export default initializeAIUser;

import { useAuthContext } from "../../context/AuthContext";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const fromMe = message.senderId === authUser._id;
    const isAI = message.isAI || message.senderId === "ai" || message.senderId?.includes("ai");

    const chatClassName = fromMe ? "chat-end" : "chat-start";

    const getBubbleStyle = () => {
        if (isAI) return {
            backgroundColor: "var(--bg-bubble-ai)",
            color: "var(--text-bubble-ai)",
            border: "1px solid var(--border-input)",
        };
        if (fromMe) return {
            backgroundColor: "var(--bg-bubble-me)",
            color: "var(--text-bubble-me)",
        };
        return {
            backgroundColor: "var(--bg-bubble-other)",
            color: "var(--text-bubble-other)",
        };
    };

    return (
        <div className={`chat ${chatClassName} message-fade-in`}>
            <div
                className="chat-bubble shadow-md px-4 py-2 rounded-2xl text-sm leading-relaxed"
                style={getBubbleStyle()}
            >
                {message.message}
            </div>
            <div
                className="chat-footer text-xs mt-1 opacity-50"
                style={{ color: "var(--text-secondary)" }}
            >
                {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
        </div>
    );
};
export default Message;

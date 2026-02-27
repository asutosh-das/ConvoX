import { useAuthContext } from "../../context/AuthContext";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const fromMe = message.senderId === authUser._id;
    // Basic AI check assumption for styling
    const isAI = message.isAI || message.senderId === "ai" || message.senderId?.includes("ai");

    const chatClassName = fromMe ? "chat-end" : "chat-start";

    let bubbleStyle = fromMe
        ? "bg-gray-800 text-white rounded-xl"
        : "bg-gray-700 text-gray-200 rounded-xl";

    if (isAI) {
        bubbleStyle = "bg-gray-900 text-gray-200 rounded-xl border border-white/10";
    }

    return (
        <div className={`chat ${chatClassName} message-fade-in`}>
            <div className={`chat-bubble ${bubbleStyle} shadow-lg px-4 py-2`}>
                {message.message}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center mt-1 text-gray-500'>
                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};
export default Message;

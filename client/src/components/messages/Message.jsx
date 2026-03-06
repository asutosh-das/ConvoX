import { useAuthContext } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { messages, setMessages } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const isAI = message.isAI || message.senderId === "ai" || message.senderId?.includes("ai");

    const [menuOpen, setMenuOpen] = useState(false);
    const [starred, setStarred] = useState(message.starred || false);
    const menuRef = useRef(null);

    // Close menu on outside click
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleDelete = async () => {
        setMenuOpen(false);
        try {
            const res = await fetch(`/api/messages/${message._id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            // Remove from local state instantly
            setMessages(messages.filter((m) => m._id !== message._id));
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleStar = async () => {
        setMenuOpen(false);
        try {
            const res = await fetch(`/api/messages/star/${message._id}`, { method: "PATCH" });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setStarred(data.starred);
            toast.success(data.starred ? "Message starred ⭐" : "Star removed");
        } catch (err) {
            toast.error(err.message);
        }
    };

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
        <div className={`chat ${chatClassName} message-fade-in group`}>
            <div className="flex items-end gap-1">
                {/* 3-dot menu — left of bubble for sent messages, right for received */}
                {fromMe && (
                    <div className="relative opacity-0 group-hover:opacity-100 transition-opacity self-center" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                            title="Message options"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <circle cx="8" cy="3" r="1.5" />
                                <circle cx="8" cy="8" r="1.5" />
                                <circle cx="8" cy="13" r="1.5" />
                            </svg>
                        </button>
                        {menuOpen && (
                            <div
                                className="absolute bottom-8 right-0 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[140px] py-1"
                                style={{
                                    backgroundColor: "var(--bg-card)",
                                    border: "1px solid var(--border-input)",
                                }}
                            >
                                <button
                                    onClick={handleStar}
                                    className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors hover:bg-white/5"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {starred ? "💛 Unstar" : "⭐ Star"}
                                </button>
                                <div className="h-px mx-2" style={{ backgroundColor: "var(--border)" }} />
                                <button
                                    onClick={handleDelete}
                                    className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors hover:bg-red-500/10 text-red-400"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Message Bubble */}
                <div className="relative chat-bubble shadow-md px-4 py-2 rounded-2xl text-sm leading-relaxed" style={getBubbleStyle()}>
                    {message.message}
                    {/* Star badge */}
                    {starred && (
                        <span className="absolute -top-2 -right-2 text-xs">⭐</span>
                    )}
                </div>

                {/* 3-dot for received messages */}
                {!fromMe && (
                    <div className="relative opacity-0 group-hover:opacity-100 transition-opacity self-center" ref={!fromMe ? menuRef : undefined}>
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                            title="Message options"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <circle cx="8" cy="3" r="1.5" />
                                <circle cx="8" cy="8" r="1.5" />
                                <circle cx="8" cy="13" r="1.5" />
                            </svg>
                        </button>
                        {menuOpen && (
                            <div
                                className="absolute bottom-8 left-0 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[140px] py-1"
                                style={{
                                    backgroundColor: "var(--bg-card)",
                                    border: "1px solid var(--border-input)",
                                }}
                            >
                                <button
                                    onClick={handleStar}
                                    className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors hover:bg-white/5"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {starred ? "💛 Unstar" : "⭐ Star"}
                                </button>
                                <div className="h-px mx-2" style={{ backgroundColor: "var(--border)" }} />
                                <button
                                    onClick={handleDelete}
                                    className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors hover:bg-red-500/10 text-red-400"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="chat-footer text-xs mt-1 opacity-50" style={{ color: "var(--text-secondary)" }}>
                {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
        </div>
    );
};
export default Message;

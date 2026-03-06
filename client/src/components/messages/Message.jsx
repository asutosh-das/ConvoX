import { useAuthContext } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const Message = ({ message, selectMode, isSelected, onToggleSelect }) => {
    const { authUser } = useAuthContext();
    const { messages, setMessages } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const isAI = message.isAI || message.senderId === "ai" || message.senderId?.includes("ai");

    const [menuOpen, setMenuOpen] = useState(false);
    const [starred, setStarred] = useState(message.starred || false);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!menuOpen) return;
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [menuOpen]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.message);
        toast.success("Copied!");
        setMenuOpen(false);
    };

    const handleStar = async () => {
        setMenuOpen(false);
        try {
            const res = await fetch(`/api/messages/star/${message._id}`, { method: "PATCH" });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setStarred(data.starred);
            toast.success(data.starred ? "Starred ⭐" : "Unstarred");
        } catch (err) { toast.error(err.message); }
    };

    const handleDelete = async () => {
        setMenuOpen(false);
        try {
            const res = await fetch(`/api/messages/${message._id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setMessages(messages.filter((m) => m._id !== message._id));
        } catch (err) { toast.error(err.message); }
    };

    const getBubbleStyle = () => {
        const base = isSelected
            ? { outline: "2px solid var(--accent)", outlineOffset: "2px" }
            : {};
        if (isAI) return { ...base, backgroundColor: "var(--bg-bubble-ai)", color: "var(--text-bubble-ai)", border: "1px solid var(--border-input)" };
        if (fromMe) return { ...base, backgroundColor: "var(--bg-bubble-me)", color: "var(--text-bubble-me)" };
        return { ...base, backgroundColor: "var(--bg-bubble-other)", color: "var(--text-bubble-other)" };
    };

    const chatClassName = fromMe ? "chat-end" : "chat-start";

    // ─── SELECT MODE: tap to check/uncheck ───────────────────────────────────
    if (selectMode) {
        return (
            <div
                className={`flex items-center gap-3 py-1 px-2 rounded-xl cursor-pointer transition-colors ${fromMe ? "flex-row-reverse" : "flex-row"}`}
                style={{ backgroundColor: isSelected ? "var(--bg-input)" : "transparent" }}
                onClick={() => onToggleSelect(message._id)}
            >
                {/* Checkbox */}
                <div
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                    style={{
                        borderColor: isSelected ? "var(--accent)" : "var(--text-secondary)",
                        backgroundColor: isSelected ? "var(--accent)" : "transparent",
                    }}
                >
                    {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                </div>

                <div className={`chat ${chatClassName} flex-1`}>
                    <div className="chat-bubble shadow-md px-4 py-2 rounded-2xl text-sm leading-relaxed" style={getBubbleStyle()}>
                        {message.message}
                    </div>
                    <div className="chat-footer text-xs mt-1 opacity-40" style={{ color: "var(--text-secondary)" }}>
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                </div>
            </div>
        );
    }

    // ─── NORMAL MODE: hover shows 3-dot ──────────────────────────────────────
    return (
        <div className={`chat ${chatClassName} message-fade-in group`}>
            <div className="relative chat-bubble shadow-md px-4 py-2 rounded-2xl text-sm leading-relaxed" style={getBubbleStyle()}>
                {message.message}
                {starred && <span className="absolute -top-2 -right-1 text-xs">⭐</span>}

                {/* Subtle ▾ on hover */}
                <div
                    ref={menuRef}
                    className={`absolute top-1 ${fromMe ? "left-1" : "right-1"} opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                    <button
                        onClick={() => setMenuOpen((p) => !p)}
                        className="w-5 h-5 flex items-center justify-center rounded-full text-xs"
                        style={{ color: fromMe ? "rgba(255,255,255,0.5)" : "var(--text-secondary)", backgroundColor: "rgba(0,0,0,0.15)" }}
                    >▾</button>

                    {menuOpen && (
                        <div
                            className={`absolute top-6 ${fromMe ? "right-0" : "left-0"} rounded-xl shadow-2xl overflow-hidden z-50 min-w-[150px] py-1`}
                            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-input)", animation: "fadeIn 0.1s ease-out" }}
                        >
                            {[
                                { label: "Copy", icon: "📋", fn: handleCopy },
                                { label: starred ? "Unstar" : "Star", icon: starred ? "💛" : "⭐", fn: handleStar },
                            ].map(({ label, icon, fn }) => (
                                <button key={label} onClick={fn}
                                    className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-white/5 transition-colors"
                                    style={{ color: "var(--text-primary)" }}>
                                    <span>{icon}</span><span className="font-medium">{label}</span>
                                </button>
                            ))}
                            <div className="h-px mx-2 my-1" style={{ backgroundColor: "var(--border)" }} />
                            <button onClick={handleDelete}
                                className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-red-500/10 transition-colors text-red-400">
                                <span>🗑️</span><span className="font-medium">Delete</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="chat-footer text-xs mt-1 opacity-40" style={{ color: "var(--text-secondary)" }}>
                {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
        </div>
    );
};
export default Message;

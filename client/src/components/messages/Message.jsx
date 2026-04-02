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
            const text = await res.text();
            const data = text ? JSON.parse(text) : {};
            if (data.error) throw new Error(data.error);
            setStarred(data.starred);
            toast.success(data.starred ? "Starred ⭐" : "Unstarred");
        } catch (err) { toast.error(err.message); }
    };

    const handleDelete = async () => {
        setMenuOpen(false);
        try {
            const res = await fetch(`/api/messages/${message._id}`, { method: "DELETE" });
            const text = await res.text();
            const data = text ? JSON.parse(text) : {};
            if (data.error) throw new Error(data.error);
            setMessages(messages.filter((m) => m._id !== message._id));
        } catch (err) { toast.error(err.message); }
    };

    const getBubbleStyle = () => {
        const base = isSelected ? { outline: "2px solid var(--accent)", outlineOffset: "2px" } : {};
        if (isAI) return { ...base, background: "var(--bg-bubble-ai)", color: "var(--text-bubble-ai)", border: "1px solid rgba(255,255,255,0.05)" };
        if (fromMe) return { ...base, background: "var(--bg-bubble-me)", color: "var(--text-bubble-me)" };
        return { ...base, background: "var(--bg-bubble-other)", color: "var(--text-bubble-other)", border: "1px solid rgba(255,255,255,0.02)" };
    };

    const getBubbleRadius = () => {
        return fromMe ? "rounded-3xl rounded-tr-[10px]" : "rounded-3xl rounded-tl-[10px]";
    };

    const chatClassName = fromMe ? "chat-end" : "chat-start";

    if (selectMode) {
        return (
            <div
                className={`flex items-center gap-3 py-1 px-2 rounded-2xl cursor-pointer transition-all ${fromMe ? "flex-row-reverse" : "flex-row"}`}
                style={{ backgroundColor: isSelected ? "rgba(99,102,241,0.1)" : "transparent" }}
                onClick={() => onToggleSelect(message._id)}
            >
                <div
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all shadow-sm"
                    style={{ borderColor: isSelected ? "var(--accent)" : "rgba(255,255,255,0.2)", backgroundColor: isSelected ? "var(--accent)" : "rgba(0,0,0,0.2)" }}
                >
                    {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <div className={`chat ${chatClassName} flex-1`}>
                    <div className={`chat-bubble shadow-xl px-5 py-3 text-[15px] leading-relaxed backdrop-blur-md ${getBubbleRadius()}`} style={getBubbleStyle()}>
                        {message.message}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`chat ${chatClassName} message-fade-in group`}>
            {/* The invisible spacer div helps block out the margin without messing up flex */}
            <div className={`relative chat-bubble shadow-xl px-5 py-3 text-[15px] leading-relaxed backdrop-blur-md ${getBubbleRadius()}`} style={getBubbleStyle()}>
                {message.message}
                {starred && <span className="absolute -top-2 -right-1 text-sm bg-yellow-500/20 rounded-full p-1 border border-yellow-500/30">⭐</span>}

                <div ref={menuRef} className={`absolute top-2 ${fromMe ? "-left-10" : "-right-10"} opacity-0 group-hover:opacity-100 transition-opacity z-10`}>
                    <button
                        onClick={() => setMenuOpen((p) => !p)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-xs text-white/50 bg-black/30 hover:bg-black/50 hover:text-white backdrop-blur-md border border-white/10 shadow-lg"
                    >▾</button>
                    {menuOpen && (
                        <div className={`absolute top-10 ${fromMe ? "right-0" : "left-0"} rounded-2xl shadow-2xl overflow-hidden min-w-[160px] py-1 glassmorphism border border-white/10 z-[100]`} style={{ animation: "fadeIn 0.15s ease-out" }}>
                            {[{ label: "Copy", icon: "📋", fn: handleCopy }, { label: starred ? "Unstar" : "Star", icon: starred ? "💛" : "⭐", fn: handleStar }].map(({ label, icon, fn }) => (
                                <button key={label} onClick={fn} className="w-full text-left px-5 py-3 text-sm flex items-center gap-3 hover:bg-white/10 transition-colors text-white">
                                    <span>{icon}</span><span className="font-medium tracking-wide">{label}</span>
                                </button>
                            ))}
                            <div className="h-px mx-2 my-1 bg-white/10" />
                            <button onClick={handleDelete} className="w-full text-left px-5 py-3 text-sm flex items-center gap-3 hover:bg-red-500/20 transition-colors text-red-400 font-medium tracking-wide">
                                <span>🗑️</span><span>Delete</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="chat-footer text-[11px] font-medium mt-1.5 opacity-40 text-white/60 tracking-wider">
                {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
        </div>
    );
};
export default Message;

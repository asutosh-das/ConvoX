import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation, messages, setMessages } = useConversation();
    const [selectMode, setSelectMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
    const headerMenuRef = useRef(null);

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    // Exit selection mode when conversation changes
    useEffect(() => {
        setSelectMode(false);
        setSelectedIds(new Set());
    }, [selectedConversation]);

    // Close header menu on outside click
    useEffect(() => {
        if (!headerMenuOpen) return;
        const handler = (e) => {
            if (headerMenuRef.current && !headerMenuRef.current.contains(e.target)) setHeaderMenuOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [headerMenuOpen]);

    const toggleSelect = (id) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const exitSelectMode = () => {
        setSelectMode(false);
        setSelectedIds(new Set());
    };

    const handleBulkDelete = async () => {
        try {
            await Promise.all(
                [...selectedIds].map((id) =>
                    fetch(`/api/messages/${id}`, { method: "DELETE" })
                )
            );
            setMessages(messages.filter((m) => !selectedIds.has(m._id)));
            toast.success(`${selectedIds.size} message(s) deleted`);
            exitSelectMode();
        } catch {
            toast.error("Failed to delete messages");
        }
    };

    const handleBulkStar = async () => {
        try {
            await Promise.all(
                [...selectedIds].map((id) =>
                    fetch(`/api/messages/star/${id}`, { method: "PATCH" })
                )
            );
            toast.success(`${selectedIds.size} message(s) starred ⭐`);
            exitSelectMode();
        } catch {
            toast.error("Failed to star messages");
        }
    };

    return (
        <div
            className='flex-1 flex flex-col h-full overflow-hidden rounded-2xl md:rounded-l-none'
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div
                        className='px-6 py-4 flex items-center justify-between border-b'
                        style={{ borderColor: "var(--border)" }}
                    >
                        {selectMode ? (
                            /* Selection mode header */
                            <div className="flex items-center gap-3 w-full">
                                <button
                                    onClick={exitSelectMode}
                                    className="text-lg font-bold px-1"
                                    style={{ color: "var(--text-secondary)" }}
                                    title="Cancel"
                                >
                                    ✕
                                </button>
                                <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                                    {selectedIds.size} selected
                                </span>
                            </div>
                        ) : (
                            /* Normal header */
                            <div className="flex items-center gap-3 w-full justify-between">
                                <div className="flex items-center gap-3">
                                    <span className='font-semibold text-base' style={{ color: "var(--text-primary)" }}>
                                        {selectedConversation.fullName}
                                    </span>
                                    {selectedConversation.isAI && (
                                        <span
                                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                                            style={{ backgroundColor: "var(--bg-bubble-ai)", color: "var(--text-bubble-ai)", border: "1px solid var(--border-input)" }}
                                        >
                                            AI
                                        </span>
                                    )}
                                </div>

                                {/* Header 3-dot menu */}
                                <div ref={headerMenuRef} className="relative">
                                    <button
                                        onClick={() => setHeaderMenuOpen((p) => !p)}
                                        className="p-2 rounded-full transition-colors"
                                        style={{ color: "var(--text-secondary)" }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-input)"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                        title="More options"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <circle cx="8" cy="3" r="1.5" />
                                            <circle cx="8" cy="8" r="1.5" />
                                            <circle cx="8" cy="13" r="1.5" />
                                        </svg>
                                    </button>

                                    {headerMenuOpen && (
                                        <div
                                            className="absolute right-0 top-10 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[180px] py-1"
                                            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-input)", animation: "fadeIn 0.12s ease-out" }}
                                        >
                                            <button
                                                onClick={() => { setSelectMode(true); setHeaderMenuOpen(false); }}
                                                className="w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-white/5 transition-colors"
                                                style={{ color: "var(--text-primary)" }}
                                            >
                                                <span>☑️</span>
                                                <span className="font-medium">Select Messages</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <Messages
                        selectMode={selectMode}
                        selectedIds={selectedIds}
                        onToggleSelect={toggleSelect}
                    />

                    {/* Bottom action bar when in select mode */}
                    {selectMode && (
                        <div
                            className="px-6 py-3 flex items-center justify-between border-t"
                            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
                        >
                            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                {selectedIds.size > 0 ? `${selectedIds.size} message${selectedIds.size > 1 ? "s" : ""} selected` : "Tap messages to select"}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleBulkStar}
                                    disabled={selectedIds.size === 0}
                                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-30"
                                    style={{ backgroundColor: "var(--bg-input)", color: "var(--text-primary)", border: "1px solid var(--border-input)" }}
                                >
                                    ⭐ Star
                                </button>
                                <button
                                    onClick={handleBulkDelete}
                                    disabled={selectedIds.size === 0}
                                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-30 text-red-400 hover:bg-red-500/10"
                                    style={{ border: "1px solid rgba(239,68,68,0.3)" }}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    )}

                    {!selectMode && <MessageInput />}
                </>
            )}
        </div>
    );
};
export default MessageContainer;

const NoChatSelected = () => (
    <div className='flex items-center justify-center w-full h-full' style={{ color: "var(--text-secondary)" }}>
        <div className='px-4 text-center flex flex-col items-center gap-3'>
            <div className="text-4xl">💬</div>
            <p className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>Welcome to ConvoX</p>
            <p className="text-sm">Select a chat or the <span className="font-bold" style={{ color: "var(--accent)" }}>AI</span> to start messaging</p>
        </div>
    </div>
);

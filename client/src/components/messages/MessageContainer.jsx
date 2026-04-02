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

    useEffect(() => {
        setSelectMode(false);
        setSelectedIds(new Set());
    }, [selectedConversation]);

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
        <div className='flex-1 flex flex-col h-full overflow-hidden relative bg-[#09090b]/40'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header - Glassmorphic Blur */}
                    <div className='px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-xl bg-[#09090b]/60 z-20 absolute top-0 w-full'>
                        {selectMode ? (
                            <div className="flex items-center gap-3 w-full">
                                <button onClick={exitSelectMode} className="text-lg font-bold px-1 text-gray-400 hover:text-white transition-colors" title="Cancel">✕</button>
                                <span className="font-semibold text-sm text-white">{selectedIds.size} selected</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 w-full justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shadow-lg">
                                       <img src={selectedConversation.profilePic || `https://api.dicebear.com/7.x/initials/svg?seed=${selectedConversation.fullName}`} alt="profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className='font-bold text-base text-white tracking-wide'>{selectedConversation.fullName}</span>
                                        {selectedConversation.isAI && (
                                            <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold">AI Assistant</span>
                                        )}
                                    </div>
                                </div>

                                <div ref={headerMenuRef} className="relative">
                                    <button
                                        onClick={() => setHeaderMenuOpen((p) => !p)}
                                        className="p-2 rounded-full transition-colors text-gray-400 hover:bg-white/10 hover:text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <circle cx="8" cy="3" r="1.5" />
                                            <circle cx="8" cy="8" r="1.5" />
                                            <circle cx="8" cy="13" r="1.5" />
                                        </svg>
                                    </button>

                                    {headerMenuOpen && (
                                        <div className="absolute right-0 top-10 rounded-2xl shadow-2xl overflow-hidden z-50 min-w-[200px] py-2 glassmorphism border border-white/10">
                                            <button onClick={() => { setSelectMode(true); setHeaderMenuOpen(false); }} className="w-full text-left px-5 py-2.5 text-sm flex items-center gap-3 hover:bg-white/10 transition-colors text-white">
                                                <span>☑️</span><span className="font-medium">Select Messages</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto pt-[80px] pb-[100px] scrollbar-thin">
                        <Messages selectMode={selectMode} selectedIds={selectedIds} onToggleSelect={toggleSelect} />
                    </div>

                    {selectMode ? (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 flex items-center gap-6 rounded-3xl glassmorphism shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 z-30 min-w-[300px] justify-between">
                            <span className="text-sm font-semibold text-gray-300">
                                {selectedIds.size} <span className="font-normal opacity-70">selected</span>
                            </span>
                            <div className="flex items-center gap-2">
                                <button onClick={handleBulkStar} disabled={selectedIds.size === 0} className="px-4 py-2 rounded-xl text-sm font-medium transition-all text-white bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30">⭐ Star</button>
                                <button onClick={handleBulkDelete} disabled={selectedIds.size === 0} className="px-4 py-2 rounded-xl text-sm font-medium transition-all text-red-100 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 disabled:opacity-30">🗑️ Delete</button>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute bottom-6 left-0 w-full px-6 pointer-events-none z-30">
                            <div className="pointer-events-auto w-full">
                                <MessageInput />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
export default MessageContainer;

const NoChatSelected = () => (
    <div className='flex items-center justify-center w-full h-full text-gray-500'>
        <div className='text-center flex flex-col items-center gap-4 bg-white/5 p-10 rounded-3xl backdrop-blur-xl border border-white/5 shadow-2xl'>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
               <span className="text-4xl text-indigo-400">✧</span>
            </div>
            <div>
               <p className="font-bold text-2xl text-white tracking-wide mb-1">ConvoX</p>
               <p className="text-sm text-gray-400">Select a conversation or talk to <span className="text-indigo-400 font-semibold">AI</span></p>
            </div>
        </div>
    </div>
);

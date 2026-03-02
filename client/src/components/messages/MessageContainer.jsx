import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

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
                        <div className="flex items-center gap-3">
                            <span
                                className='font-semibold text-base'
                                style={{ color: "var(--text-primary)" }}
                            >
                                {selectedConversation.fullName}
                            </span>
                            {selectedConversation.isAI && (
                                <span
                                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                                    style={{
                                        backgroundColor: "var(--bg-bubble-ai)",
                                        color: "var(--text-bubble-ai)",
                                        border: "1px solid var(--border-input)"
                                    }}
                                >
                                    AI
                                </span>
                            )}
                        </div>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};
export default MessageContainer;

const NoChatSelected = () => {
    return (
        <div
            className='flex items-center justify-center w-full h-full'
            style={{ color: "var(--text-secondary)" }}
        >
            <div className='px-4 text-center flex flex-col items-center gap-3'>
                <div className="text-4xl">💬</div>
                <p className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>Welcome to ConvoX</p>
                <p className="text-sm">Select a chat or the <span className="font-bold" style={{ color: "var(--accent)" }}>AI</span> to start messaging</p>
            </div>
        </div>
    );
};

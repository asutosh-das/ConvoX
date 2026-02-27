import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null); // cleanup on unmount
    }, [setSelectedConversation]);

    return (
        <div className='flex-1 flex flex-col h-full overflow-hidden bg-black glassmorphism md:rounded-l-none border-l-0'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className='bg-transparent px-6 py-4 mb-2 flex items-center justify-between border-b border-white/10'>
                        <div className="flex items-center gap-3">
                            <span className='text-gray-200 font-semibold'>{selectedConversation.fullName}</span>
                            {selectedConversation.isAI && <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full border border-white/10">AI</span>}
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
        <div className='flex items-center justify-center w-full h-full bg-black glassmorphism md:rounded-l-none border-l-0'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-400 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome</p>
                <p>Select a chat or the <span className="text-gray-200 font-bold border-b border-gray-600 pb-0.5">AI</span> to start messaging</p>
            </div>
        </div>
    );
};

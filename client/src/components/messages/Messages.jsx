import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto space-y-2 py-4'>
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center text-gray-500 mt-10'>Send a message to start the conversation</p>
            )}
        </div>
    );
};
export default Messages;

const MessageSkeleton = () => {
    return (
        <div className='animate-pulse'>
            <div className='flex gap-3 items-center'>
                <div className='w-10 h-10 rounded-full shrink-0 bg-[#1a1a1a]'></div>
                <div className='flex flex-col gap-1'>
                    <div className='h-4 w-40 bg-[#1a1a1a] rounded'></div>
                    <div className='h-4 w-40 bg-[#1a1a1a] rounded'></div>
                </div>
            </div>
            <div className='flex gap-3 items-center justify-end mt-4'>
                <div className='flex flex-col gap-1 items-end'>
                    <div className='h-4 w-40 bg-[#1a1a1a] rounded'></div>
                </div>
                <div className='w-10 h-10 rounded-full shrink-0 bg-[#1a1a1a]'></div>
            </div>
        </div>
    );
};

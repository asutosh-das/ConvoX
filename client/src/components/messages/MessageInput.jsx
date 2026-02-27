import { useState } from "react";
import { Send } from "lucide-react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    };

    return (
        <form className='px-4 my-4' onSubmit={handleSubmit}>
            <div className='w-full relative group'>
                <input
                    type='text'
                    className='block w-full p-4 bg-[#0f0f0f] text-gray-200 rounded-full border border-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 pr-12 transition-all shadow-lg'
                    placeholder='Send a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='absolute inset-y-0 right-2 flex items-center pr-3 text-gray-500 hover:text-gray-300 transition-colors' disabled={loading}>
                    {loading ? <div className='loading loading-spinner text-gray-400'></div> : <Send size={20} />}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;

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
        <form className='w-full' onSubmit={handleSubmit}>
            <div className='relative flex items-center w-full'>
                <input
                    type='text'
                    className='block w-full py-4 pl-6 pr-16 rounded-[2rem] focus:outline-none transition-all shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-[15px] tracking-wide placeholder-gray-500 bg-[#121214]/80 backdrop-blur-2xl border border-white/10 focus:border-indigo-500/50 focus:bg-[#18181b]/90 text-white'
                    placeholder='Type a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type='submit'
                    disabled={loading || !message.trim()}
                    className={`absolute right-2 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                        message.trim() 
                            ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:bg-indigo-400 hover:scale-105" 
                            : "bg-white/5 text-gray-500"
                    }`}
                >
                    {loading
                        ? <div className='w-5 h-5 border-2 border-t-white border-white/30 rounded-full animate-spin'></div>
                        : <Send size={18} className={message.trim() ? "ml-0.5" : ""} />
                    }
                </button>
            </div>
        </form>
    );
};
export default MessageInput;

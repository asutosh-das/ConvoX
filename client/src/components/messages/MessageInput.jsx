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
        <form className='px-4 pb-4 pt-2' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='block w-full p-4 pr-14 rounded-full border focus:outline-none focus:ring-2 transition-all shadow-sm text-sm'
                    style={{
                        backgroundColor: "var(--bg-input)",
                        borderColor: "var(--border-input)",
                        color: "var(--text-primary)",
                    }}
                    placeholder='Send a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type='submit'
                    disabled={loading}
                    className='absolute inset-y-0 right-2 flex items-center pr-3 transition-colors'
                    style={{ color: message ? "var(--accent)" : "var(--text-secondary)" }}
                >
                    {loading
                        ? <div className='loading loading-spinner' style={{ color: "var(--accent)" }}></div>
                        : <Send size={20} />
                    }
                </button>
            </div>
        </form>
    );
};
export default MessageInput;

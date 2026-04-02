import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;

    return (
        <div className="mb-1 relative">
            {/* Active Indication Bar */}
            {isSelected && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_8px_rgba(99,102,241,0.8)] z-10"></div>
            )}
            
            <div
                className={`flex gap-3 items-center p-3 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isSelected 
                        ? "bg-white/10 border-white/10 shadow-lg shadow-black/20" 
                        : "bg-transparent border-transparent hover:bg-white/5"
                }`}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${conversation.isAI ? "online" : ""}`}>
                    <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-white/10 bg-[#121214] shadow-inner">
                        <img
                            src={conversation.profilePic || `https://api.dicebear.com/7.x/${conversation.isAI ? 'bottts' : 'avataaars'}/svg?seed=${conversation.fullName}`}
                            alt={conversation.fullName}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://api.dicebear.com/7.x/${conversation.isAI ? 'bottts' : 'avataaars'}/svg?seed=${conversation.fullName}`;
                            }}
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1 min-w-0 justify-center'>
                    <div className='flex gap-2 justify-between items-center mb-0.5'>
                        <p className={`font-semibold text-sm truncate ${isSelected ? "text-white" : "text-gray-300"}`}>
                            {conversation.fullName}
                        </p>
                        {conversation.isAI && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                AI
                            </span>
                        )}
                        {!conversation.isAI && isSelected && (
                            <span className="text-[10px] text-gray-400">now</span>
                        )}
                    </div>
                    <p className={`text-xs truncate ${isSelected ? "text-indigo-200" : "text-gray-500"}`}>
                        {conversation.isAI ? "ConvoX Intelligence" : "Tap to chat"}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Conversation;

import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;

    return (
        <>
            <div
                className={`flex gap-3 items-center p-3 py-3 rounded-xl cursor-pointer transition-all`}
                style={{
                    backgroundColor: isSelected ? "var(--accent)" : "transparent",
                    color: isSelected ? "#ffffff" : "var(--text-primary)",
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = "var(--bg-input)"; }}
                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = "transparent"; }}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${conversation.isAI ? "online" : ""}`}>
                    <div className='w-11 rounded-full' style={{ border: "2px solid var(--border-input)" }}>
                        <img src={conversation.profilePic} alt='user avatar' />
                    </div>
                </div>

                <div className='flex flex-col flex-1 min-w-0'>
                    <div className='flex gap-2 justify-between items-center'>
                        <p
                            className='font-semibold text-sm truncate'
                            style={{ color: isSelected ? "#ffffff" : "var(--text-primary)" }}
                        >
                            {conversation.fullName}
                        </p>
                        {conversation.isAI && (
                            <span
                                className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                                style={isSelected
                                    ? { backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" }
                                    : { backgroundColor: "var(--bg-bubble-ai)", color: "var(--text-bubble-ai)", border: "1px solid var(--border-input)" }
                                }
                            >
                                AI
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='h-px my-0.5 opacity-30' style={{ backgroundColor: "var(--border)" }} />}
        </>
    );
};
export default Conversation;

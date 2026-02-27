import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    return (
        <>
            <div
                className={`flex gap-3 items-center p-3 py-3 rounded-xl cursor-pointer transition-all border border-transparent
				${isSelected ? "bg-white/10 border-white/10" : "hover:bg-white/5 hover:border-white/5"}
			`}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${conversation.isAI ? 'online' : ''}`}>
                    <div className='w-12 rounded-full border border-white/20'>
                        <img src={conversation.profilePic} alt='user avatar' />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between items-center'>
                        <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                        {conversation.isAI && <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full border border-white/10">AI</span>}
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1 opacity-10' />}
        </>
    );
};
export default Conversation;

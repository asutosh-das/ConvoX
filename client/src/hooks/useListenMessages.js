import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            // Basic typing sound or animation could trigger here
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
};
export default useListenMessages;

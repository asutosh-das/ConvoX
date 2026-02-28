import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            // Use environment variable for production, fallback to localhost for development
            const backendUrl = import.meta.env.MODE === "development" ? "http://localhost:5000" : (import.meta.env.VITE_BACKEND_URL || "/");
            const socketInstance = io(backendUrl, {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socketInstance);

            // socket.on() is used to listen to the events. can be used both on client and server side
            socketInstance.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socketInstance.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};

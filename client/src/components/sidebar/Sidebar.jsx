import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import Conversations from "./Conversations";

const Sidebar = () => {
    const { logout } = useLogout();

    return (
        <div className='glass-panel p-5 flex flex-col w-[320px] min-w-[280px] relative z-10 transition-colors duration-300'>

            {/* Header / Brand */}
            <div className="mb-6 flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="text-white font-bold text-lg">C</span>
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">ConvoX</h1>
            </div>

            {/* Search Input */}
            <div className="mb-6">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full pl-10 pr-4 py-2.5 glass-input text-sm placeholder-gray-500"
                    />
                </div>
            </div>

            <h2 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Messages</h2>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto -mx-2 px-2 scrollbar-thin">
                <Conversations />
            </div>

            {/* Bottom Profile / Logout Area */}
            <div className="mt-4 pt-4 border-t border-white/5">
                <div
                    onClick={logout}
                    className="p-3 rounded-2xl cursor-pointer transition-all flex items-center gap-3 w-full hover:bg-white/5 hover:border-white/10 border border-transparent group"
                >
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
                        <LogOut size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">Logout</span>
                        <span className="text-xs text-gray-500">End session</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;

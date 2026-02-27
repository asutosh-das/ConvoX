import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

import Conversations from "./Conversations";

const Sidebar = () => {
    const { logout } = useLogout();

    return (
        <div className='border-r border-white/10 p-4 flex flex-col w-1/3 min-w-[250px] bg-[#111] relative z-10'>

            {/* Search Input */}
            <div className="mb-4">
                <input type="text" placeholder="Search..." className="w-full px-4 py-2 rounded-full bg-[#0f0f0f] border border-white/10 text-gray-200 focus:outline-none focus:border-gray-500 transition-colors" />
            </div>

            <div className='divider my-0 px-3 opacity-10 border-t border-white/10'></div>

            {/* Conversations */}
            <Conversations />

            <div className="mt-auto pt-4 flex justify-between items-center text-gray-400">
                <div onClick={logout} className="p-2 bg-black/50 hover:bg-white/5 hover:text-white rounded-full cursor-pointer transition-all border border-transparent hover:border-white/10">
                    <LogOut size={20} />
                </div>
            </div>
        </div>
    );
};
export default Sidebar;

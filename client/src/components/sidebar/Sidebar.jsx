import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import Conversations from "./Conversations";

const Sidebar = () => {
    const { logout } = useLogout();

    return (
        <div
            className='border-r p-4 flex flex-col w-1/3 min-w-[250px] relative z-10 transition-colors duration-300'
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-full border focus:outline-none transition-colors"
                    style={{ backgroundColor: "var(--bg-input)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                />
            </div>

            <div className='divider my-0 px-3 opacity-10 border-t' style={{ borderColor: "var(--border)" }}></div>

            {/* Conversations */}
            <Conversations />

            <div className="mt-auto pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                {/* Logout Button */}
                <div
                    onClick={logout}
                    className="p-2 rounded-full cursor-pointer transition-all flex items-center gap-2 text-sm w-fit"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.backgroundColor = "transparent"; }}
                    title="Logout"
                >
                    <LogOut size={20} />
                </div>
            </div>
        </div>
    );
};
export default Sidebar;

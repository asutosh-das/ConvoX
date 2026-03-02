import { create } from "zustand";

// Initialize theme from localStorage, defaulting to "dark"
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("convox-theme");
    const theme = savedTheme || "dark";
    document.documentElement.setAttribute("data-theme", theme);
    return theme;
};

const useTheme = create((set) => ({
    theme: getInitialTheme(),
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "dark" ? "light" : "dark";
            localStorage.setItem("convox-theme", newTheme);
            document.documentElement.setAttribute("data-theme", newTheme);
            return { theme: newTheme };
        }),
}));

export default useTheme;

import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import toast from "react-hot-toast";

const inputStyle = {
    backgroundColor: "var(--bg-input)",
    borderColor: "var(--border-input)",
    color: "var(--text-primary)",
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div
                className='w-full p-8 rounded-3xl shadow-2xl sm:min-w-[400px] transition-colors duration-300'
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
                <h1 className='text-3xl font-bold text-center mb-1' style={{ color: "var(--text-primary)" }}>
                    Welcome Back
                </h1>
                <p className='text-center text-sm mb-8' style={{ color: "var(--accent)" }}>
                    Connect to ConvoX
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className='block text-sm font-medium mb-2' style={{ color: "var(--text-secondary)" }}>
                            Username
                        </label>
                        <input
                            type='text'
                            placeholder='Username'
                            className='w-full rounded-xl h-12 pl-4 border focus:outline-none focus:ring-2 transition-all text-sm'
                            style={{ ...inputStyle, "--tw-ring-color": "var(--accent)" }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium mb-2' style={{ color: "var(--text-secondary)" }}>
                            Password
                        </label>
                        <input
                            type='password'
                            placeholder='••••••••••••'
                            className='w-full rounded-xl h-12 pl-4 border focus:outline-none focus:ring-2 transition-all text-sm'
                            style={inputStyle}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className='w-full h-12 rounded-xl text-white font-semibold transition-all shadow-lg mt-2 text-sm'
                        style={{ backgroundColor: "var(--accent)" }}
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
                    </button>

                    <div className="flex items-center gap-3 my-2">
                        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-input)" }}></div>
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>or</span>
                        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-input)" }}></div>
                    </div>

                    <button
                        type="button"
                        onClick={() => toast.success("Google Authentication coming soon!")}
                        className='w-full h-12 font-medium bg-white hover:bg-slate-50 text-slate-800 rounded-xl shadow-md flex items-center justify-center gap-3 transition-all text-sm border border-slate-200'
                    >
                        <svg className="w-5 h-5" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        </svg>
                        Sign in with Google
                    </button>

                    <p className="text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                        Don&apos;t have an account?{" "}
                        <Link to='/signup' className='font-semibold hover:underline' style={{ color: "var(--accent)" }}>
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;

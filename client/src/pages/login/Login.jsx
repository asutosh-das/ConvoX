import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import toast from "react-hot-toast";

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
            <div className='w-full p-6 rounded-3xl shadow-2xl glassmorphism-strong sm:min-w-[400px]'>
                <h1 className='text-3xl font-semibold text-center text-slate-200 mb-6'>
                    Welcome Back
                    <span className='text-indigo-400 block mt-1 text-sm font-normal'>Connect to ConvoX</span>
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-slate-300'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='name@company.com or username'
                            className='w-full input input-bordered bg-slate-800/50 border-slate-700 text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl h-12'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-slate-300'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='••••••••'
                            className='w-full input input-bordered bg-slate-800/50 border-slate-700 text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl h-12'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="pt-2">
                        <button className='btn btn-block bg-indigo-600 hover:bg-indigo-700 border-none text-white rounded-xl h-12 shadow-lg shadow-indigo-600/30' disabled={false}>
                            Login
                        </button>
                    </div>

                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-slate-700 before:mt-0.5 after:flex-1 after:border-t after:border-slate-700 after:mt-0.5">
                        <span className="text-center font-normal text-sm text-slate-400 mx-4">or</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => toast.success("Google Authentication coming soon!")}
                        className='btn btn-block font-medium bg-white hover:bg-slate-100 text-slate-800 border-none rounded-xl h-12 shadow-md flex items-center justify-center'
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        </svg>
                        Sign in with Google
                    </button>

                    <div className="text-center mt-4">
                        <Link to='/signup' className='text-sm hover:underline hover:text-indigo-400 mt-2 inline-block text-slate-400'>
                            {"Don't"} have an account? Sign Up
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;

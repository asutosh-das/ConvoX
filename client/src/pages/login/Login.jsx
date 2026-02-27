import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

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
                            placeholder='Enter username'
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
                            placeholder='Enter Password'
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

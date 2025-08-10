import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const InputField = ({ id, type = 'text', label, value, onChange, placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="w-full mt-1 px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
        />
    </div>
);

export default function Login() {
    const [formState, setFormState] = useState(0); // 0 = Login, 1 = Signup
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const { handleRegister, handleLogin } = useContext(AuthContext);

    const routeTo = useNavigate();

    const handleAuth = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                const result = await handleRegister(name, username, password);
                setMessage(result);
                setUsername('');
                setPassword('');
                setName('');
                setFormState(0);
            }
        } catch (err) {
            const msg = err?.response?.data?.message || 'An error occurred';
            setError(msg);
        }
    };



    return (
        <>
            <div className='min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 '>
                <IconButton onClick={() => {
                    routeTo("/")
                }}>
                    <HomeIcon />Home
                </IconButton >
                <div className="  flex items-center justify-center mt-10 md: mx-10 ">

                    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden md:flex">
                        {/* Image side */}
                        <div className="hidden md:block md:w-1/2">
                            <img src="/login.png" alt="Login Visual" className="h-full w-full object-cover" />
                        </div>

                        {/* Form side */}
                        <div className="w-full md:w-1/2 p-10">
                            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                                {formState === 0 ? 'Login' : 'Sign Up'}
                            </h2>

                            {error && <div className="text-red-600 text-sm text-center mb-4">{error}</div>}
                            {message && <div className="text-green-600 text-sm text-center mb-4">{message}</div>}

                            <form onSubmit={handleAuth} noValidate className="space-y-6">
                                {formState === 1 && (
                                    <InputField
                                        id="name"
                                        label="Full Name"
                                        value={name}
                                        placeholder="Full Name"
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                )}
                                <InputField
                                    id="username"
                                    label="Username"
                                    value={username}
                                    placeholder="username"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <InputField
                                    id="password"
                                    type="password"
                                    label="Password"
                                    value={password}
                                    placeholder="••••••••"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full text-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md"
                                >
                                    {formState === 0 ? 'Sign In' : 'Sign Up'}
                                </button>
                            </form>

                            <div className="text-center text-sm text-gray-600 mt-6">
                                {formState === 0 ? (
                                    <>
                                        Don&apos;t have an account?{' '}
                                        <span
                                            className="text-indigo-600 hover:underline font-medium cursor-pointer"
                                            onClick={() => setFormState(1)}
                                        >
                                            Sign up
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{' '}
                                        <span
                                            className="text-indigo-600 hover:underline font-medium cursor-pointer"
                                            onClick={() => setFormState(0)}
                                        >
                                            Login
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

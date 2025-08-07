import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField } from '@mui/material';

export default function Landing() {

    const [meetingCode, setMeetingCode] = React.useState('');

    const navigate = useNavigate();


    const router = useNavigate();
    let url = Math.floor(Math.random() * 100) + 1;

    const handleJoinVideoCall = async () => {
        // await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Navigation Bar */}
            <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
                <h2 className="text-2xl font-bold text-blue-600">ZoMeet</h2>
                <div className="flex items-center space-x-6">
                    {/* <p
                        onClick={() => router(`/${url}`)}
                        className="cursor-pointer text-gray-700 hover:text-blue-600 transition"
                    >
                        Join as Guest
                    </p> */}
                    <button
                        onClick={() => router("/login")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* Main Hero Section */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between flex-1 px-6 py-12 max-w-6xl mx-auto">
                {/* Text Section */}
                <div className="text-center md:text-left md:w-1/2 ">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                        <span className="text-orange-500">Connect</span> with your Loved Ones
                    </h1>
                    <p className="text-lg text-slate-600">Join as a Guest</p>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <TextField
                                                onChange={(e) => setMeetingCode(e.target.value)}
                                                label="Meeting Code"
                                                variant="outlined"
                                                className="w-full sm:w-auto"
                                            />
                                            <Button
                                                onClick={handleJoinVideoCall}
                                                variant="contained"
                                                size="large"
                                            >
                                                Join
                                            </Button>
                                        </div>
                    {/* <div className="flex flex-col sm:flex-row items-center gap-4">
                        <TextField
                            onChange={(e) => setMeetingCode(e.target.value)}
                            label="Meeting Code"
                            variant="outlined"
                            className="w-full sm:w-auto"
                        />
                        <Button
                            onClick={handleJoinVideoCall}
                            variant="contained"
                            size="large"
                        >
                            Join
                        </Button>
                    </div> */}
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <img
                        src="/bg_image.png"
                        alt="Mobile Preview"
                        className="w-full  mx-auto"
                    />
                </div>
            </div>
        </div>
    );
}

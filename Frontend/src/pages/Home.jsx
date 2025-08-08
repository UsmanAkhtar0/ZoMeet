import React, { useContext, useState } from 'react';
import WithAuth from '../utils/WithAuth';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function Home() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState('');
    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            {/* NavBar */}
            <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow">
                <h2 className="text-2xl font-bold text-blue-600">ZoMeet</h2>
                <div className="flex items-center gap-4">
                    <IconButton
                        onClick={() => navigate('/history')}
                        className="flex items-center text-gray-700 hover:text-blue-600"
                    >
                        <RestoreIcon />
                        <p className="ml-1 text-sm font-medium">History</p>
                    </IconButton>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/login');
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-12 max-w-7xl mx-auto">
                {/* Left Panel */}
                <div className="w-full md:w-1/2 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-snug">
                        Providing Quality <br /> Video Calls
                    </h2>

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
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
                    <img
                        src="/logo3.png"
                        alt="ZoMeet Illustration"
                        className="max-w-2xl w-full h-auto"
                    />
                </div>
            </main>
        </div>
    );
}

export default WithAuth(Home);

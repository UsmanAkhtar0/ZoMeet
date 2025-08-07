import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        };

        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const hr = date.getHours().toString().padStart(2, "0");
        const min = date.getMinutes().toString().padStart(2, "0");
        return `${day}/${month}/${year} at: ${hr}:${min}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 ">
            <IconButton
                onClick={() => routeTo("/home")}
                className="hover:bg-blue-100"
            >
                <HomeIcon fontSize="large" />Home
            </IconButton>
            <div className="max-w-2xl mx-auto">

                <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Meeting History</h2>

                {meetings.length !== 0 ? (
                    meetings.map((e, i) => (
                        <Card key={i} variant="outlined" className="mb-4 shadow-sm hover:shadow-lg transition-shadow">
                            <CardContent>
                                <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
                                    <strong>Meeting Code:</strong> {e.meetingCode}
                                </Typography>
                                <Typography color="text.secondary">
                                    <strong>Date:</strong> {formatDate(e.date)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center text-gray-500 mt-10">
                        No history available.
                    </div>
                )}
            </div>
        </div>
    );
}

import { useState } from 'react'
import './App.css'
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/Landing"
import Authentication from "./pages/Authentication"
import { AuthProvider } from './contexts/AuthContext';
import VideoMeet from './pages/VideoMeet';
import History from './pages/History';
import Home from './pages/Home';
import Login from './pages/Login';
function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/auth' element={<Authentication />} />
            <Route path='/:url' element={<VideoMeet />} />
            <Route path='/history' element={<History />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App

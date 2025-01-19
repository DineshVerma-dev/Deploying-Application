import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Intro.css';

const Intro = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/home'); // Redirect to the Home.jsx page
    };

    return (
        <div className="intro-container">
            <header className="intro-header">
                <h1 className="intro-title">Welcome to FileTransferHub</h1>
                <p className="intro-subtitle">
                    Your go-to platform for secure and effortless file sharing.
                </p>
            </header>

            <div className="intro-content">
                <img
                    src="https://www.epubor.com/images/uppic/best-free-file-transfer%20.png"
                    alt="File Sharing"
                    className="intro-image"
                />
                <button className="intro-button" onClick={handleRedirect}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Intro;

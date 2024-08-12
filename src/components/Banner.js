import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Banner.module.css';

const Banner = () => {
    const [banner, setBanner] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [message, setMessage] = useState('');


    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get('https://tuf-backend-cd7i.onrender.com/api/banner');
                setBanner(response.data);
                setTimeLeft(response.data.timer);
                setMessage('');
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchBanner();
    }, []);

    
    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(prevTimeLeft => {
                    if (prevTimeLeft <= 1) {
                        clearInterval(timerId);
                        setMessage('The banner cannot be updated, time\'s up!');
                        return 0;
                    }
                    return prevTimeLeft - 1;
                });
            }, 1000);

            return () => clearInterval(timerId); 
        }
    }, [timeLeft]);

    if (!banner.isVisible || timeLeft <= 0) return null;

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className={styles.banner}>
            {message ? (
                <p>{message}</p>
            ) : (
                <>
                    <p>{banner.description}</p>
                    <p>Time left: {formatTime(timeLeft)}</p>
                    <a href={banner.link} target="_blank" rel="noopener noreferrer">Click here</a>
                </>
            )}
        </div>
    );
};

export default Banner;

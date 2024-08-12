// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './Banner.module.css'; // Assuming you're using CSS Modules

// const Banner = () => {
//     const [banner, setBanner] = useState({});
//     const [timeLeft, setTimeLeft] = useState(0);
//     const [message, setMessage] = useState('');

//     // Fetch banner data from backend
//     useEffect(() => {
//         console.log('Banner component mounted');
//         const fetchBanner = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/banner');
//                 console.log('Banner data:', response.data);
//                 setBanner(response.data);
//                 setTimeLeft(response.data.timer);
//             } catch (error) {
//                 console.error('Error fetching banner data:', error);
//             }
//         };

//         fetchBanner();
//     }, []);

//     // Countdown logic
//     useEffect(() => {
//         if (timeLeft > 0) {
//             const timerId = setInterval(() => {
//                 setTimeLeft(prevTimeLeft => {
//                     if (prevTimeLeft <= 1) {
//                         clearInterval(timerId);
//                         setMessage('The banner cannot be updated, time\'s up!');
//                         return 0;
//                     }
//                     return prevTimeLeft - 1;
//                 });
//             }, 1000);

//             return () => clearInterval(timerId);
//         }
//     }, [timeLeft]);

//     // Format time in hh:mm:ss
//     const formatTime = (seconds) => {
//         const hours = Math.floor(seconds / 3600);
//         const minutes = Math.floor((seconds % 3600) / 60);
//         const secs = seconds % 60;
//         return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//     };

//     if (!banner.is_visible || timeLeft <= 0) return null;

//     return (
//         <div className={styles.banner}>
//             {message ? (
//                 <p>{message}</p>
//             ) : (
//                 <>
//                     <p>{banner.description}</p>
//                     <p>Time left: {formatTime(timeLeft)}</p>
//                     <a href={banner.link} target="_blank" rel="noopener noreferrer">Click here</a>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Banner;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Banner.module.css'; // Assuming you're using CSS Modules

const Banner = () => {
    const [banner, setBanner] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [message, setMessage] = useState('');

    // Fetch banner data from the backend
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/banner');
                setBanner(response.data);
                setTimeLeft(response.data.timer);
                setMessage('');
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchBanner();
    }, []);

    // Countdown logic
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

            return () => clearInterval(timerId); // Cleanup interval on component unmount
        }
    }, [timeLeft]);

    // Handle banner visibility and countdown
    if (!banner.isVisible || timeLeft <= 0) return null;

    // Format time in hh:mm:ss
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

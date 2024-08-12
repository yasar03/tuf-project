// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Banner from './Banner';

// const Dashboard = () => {
//     const [description, setDescription] = useState('');
//     const [timer, setTimer] = useState(0);
//     const [link, setLink] = useState('');
//     const [isVisible, setIsVisible] = useState(false);
//     const [isDisabled, setIsDisabled] = useState(false); // New state to manage form disabling

//     // Fetch banner data from backend
//     useEffect(() => {
//         const fetchBanner = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/banner');
//                 setDescription(response.data.description);
//                 setTimer(response.data.timer);
//                 setLink(response.data.link);
//                 setIsVisible(response.data.is_visible);
//                 setIsDisabled(response.data.timer <= 0); // Disable form if timer is 0 or less
//             } catch (error) {
//                 console.error('Error fetching banner data:', error);
//             }
//         };

//         fetchBanner();
//     }, []);

//     // Countdown logic
//     useEffect(() => {
//         if (timer > 0) {
//             const intervalId = setInterval(() => {
//                 setTimer(prevTimer => {
//                     const newTimer = prevTimer - 1;
//                     if (newTimer <= 0) {
//                         clearInterval(intervalId);
//                         setIsDisabled(true); // Disable the form when timer reaches 0
//                     }
//                     return newTimer;
//                 });
//             }, 1000);

//             return () => clearInterval(intervalId);
//         }
//     }, [timer]);

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const bannerData = {
//             description,
//             timer: parseInt(timer, 10), // Ensure timer is an integer
//             link,
//             is_visible: isVisible
//         };

//         try {
//             await axios.post('http://localhost:5000/api/banner', bannerData);
//             alert('Banner updated successfully');
//         } catch (error) {
//             console.error('There was an error updating the banner:', error);
//             alert('Failed to update banner. Please try again.');
//         }
//     };

//     // Format time in hh:mm:ss
//     const formatTime = (seconds) => {
//         const hours = Math.floor(seconds / 3600);
//         const minutes = Math.floor((seconds % 3600) / 60);
//         const secs = seconds % 60;
//         return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//     };

//     return (
//         <div>
//             {/* Timer display */}
//             <div>
//                 <h2>Time Left: {formatTime(timer)}</h2>
//             </div>

//             {/* Form for updating banner */}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Banner Description</label>
//                     <input
//                         type="text"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         disabled={isDisabled}
//                     />
//                 </div>
//                 <div>
//                     <label>Timer (seconds)</label>
//                     <input
//                         type="number"
//                         value={timer}
//                         onChange={(e) => setTimer(e.target.value)}
//                         disabled={isDisabled}
//                     />
//                 </div>
//                 <div>
//                     <label>Banner Link</label>
//                     <input
//                         type="text"
//                         value={link}
//                         onChange={(e) => setLink(e.target.value)}
//                         disabled={isDisabled}
//                     />
//                 </div>
//                 <div>
//                     <label>Banner Visibility</label>
//                     <input
//                         type="checkbox"
//                         checked={isVisible}
//                         onChange={(e) => setIsVisible(e.target.checked)}
//                         disabled={isDisabled}
//                     />
//                 </div>
//                 <button type="submit" disabled={isDisabled}>Update Banner</button>
//             </form>

//             {/* Display Banner component */}
//             <Banner />
//         </div>
//     );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './Banner';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(0);
    const [link, setLink] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [bannerData, setBannerData] = useState({});

    // Fetch banner data from the backend
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/banner');
                setBannerData(response.data);
                setDescription(response.data.description);
                setTimer(response.data.timer);
                setLink(response.data.link);
                setIsVisible(response.data.isVisible); // Ensure is_visible matches the backend field
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchBanner();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const bannerData = {
            description,
            timer: parseInt(timer, 10), // Ensure timer is an integer
            link,
            is_visible: isVisible
        };

        try {
            await axios.post('http://localhost:5000/api/banner', bannerData);
            alert('Banner updated successfully');
            // Fetch the updated banner data after submitting
            const responseBanner = await axios.get('http://localhost:5000/api/banner');
            setBannerData(responseBanner.data);
        } catch (error) {
            console.error('There was an error updating the banner:', error);
            alert('Failed to update banner. Please try again.');
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Banner Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Timer (seconds)</label>
                    <input
                        type="number"
                        value={timer}
                        onChange={(e) => setTimer(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Banner Link</label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Banner Visibility</label>
                    <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={(e) => setIsVisible(e.target.checked)}
                    />
                </div>
                <button type="submit">Update Banner</button>
            </form>

            {/* Conditionally display the Banner component */}
            {isVisible && <Banner />}
        </div>
    );
};

export default Dashboard;

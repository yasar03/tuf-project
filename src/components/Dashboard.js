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

   
    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get('https://tuf-backend-cd7i.onrender.com/api/banner');
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bannerData = {
            description,
            timer: parseInt(timer, 10),
            link,
            is_visible: isVisible
        };

        try {
            await axios.post('https://tuf-backend-cd7i.onrender.com/api/banner', bannerData);
            alert('Banner updated successfully');
            const responseBanner = await axios.get('https://tuf-backend-cd7i.onrender.com/api/banner');
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

            {isVisible && <Banner />}
        </div>
    );
};

export default Dashboard;

// UserPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserPage() {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get('http://localhost:8988/api/banners');
                setBanners(response.data);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, []);

    return (
        <div>
            {banners.map(banner => (
                <div key={banner.id}>
                    <h2>{banner.bannerTitle}</h2>
                    <p>{banner.bannerMessage}</p>
                    <img src={banner.imageUrl} alt={banner.bannerTitle} />
                </div>
            ))}
        </div>
    );
}

export default UserPage;

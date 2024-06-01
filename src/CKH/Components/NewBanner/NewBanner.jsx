import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import './NewBanner.css';

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get('http://localhost:8988/api/banner/all');
      setBanners(response.data);
    } catch (error) {
      console.error('배너 데이터를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className="BannerCarousel" activeIndex={index} onSelect={handleSelect}>
      {banners.map((banner, idx) => (
        <Carousel.Item key={banner.id} className={`CarouselItem ${index === idx ? 'active' : ''}`}>
          <div className="CarouselContent">
            <img
              className='CarouselImg'
              src={`http://localhost:8988/api/banner/image/${banner.image}`}
              alt={banner.title}
            />
            <div className='Text'>
              <h1>{banner.title}</h1>
              <p>{banner.message}</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ControlledCarousel;

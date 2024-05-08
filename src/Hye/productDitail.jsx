import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductPage = () => {
    const [images, setImages] = useState({
        img1: "/images/bike.jpg",
        img2: "/images/sonata.jpg",
        img3: "/images/bmw.jpg",
        img4: "/images/starLex.jpg"
    });
    const [amount, setAmount] = useState(1);
    const [activeImg, setActiveImage] = useState(images.img3);
    const [imageNames, setImageNames] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8988/api/images/names")
            .then(response => {
                setImageNames(response.data);
            })
            .catch(error => {
                console.error('Error fetching image names:', error);
            });
    }, []);

    return (
        <div className='product-page-container'>
            <div className='product-images-container'>
                <img src={activeImg} alt="" className='product-main-image'/>
                <div className="image-thumbnails">
                    {Object.keys(images).map((key) => (
                        <img
                            key={key}
                            src={images[key]}
                            alt=""
                            className='image-thumbnail'
                            onClick={() => setActiveImage(images[key])}
                        />
                    ))}
                </div>
            </div>
            <div className='product-details-container'>
                <div className='product-title'>
                    <span className='product-title-text'>상품명</span>
                    <h1 className='product-main-title'>상품 제목</h1>
                </div>
                <p className='product-description'>
                   dddd
                </p>
                {imageNames.map((imageName) => (
                        <img key={imageName} src={`/images/${imageName}`} alt={imageName} />
                    ))}
                <h6 className='product-price'>$10,000</h6>
                <div className='quantity-control'>
                    <button className='quantity-btn' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                    <span className='quantity'>{amount}</span>
                    <button className='quantity-btn' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                </div>
                <button className='add-to-cart-btn'>장바구니에 추가</button>
            </div>
        </div>
    );
}

export default ProductPage;

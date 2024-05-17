import React, { useState } from 'react';

function Payment() {
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [babyCount, setBabyCount] = useState(0);
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleIncrement = (type) => {
        switch (type) {
            case 'adult':
                setAdultCount(adultCount + 1);
                break;
            case 'child':
                setChildCount(childCount + 1);
                break;
            case 'baby':
                setBabyCount(babyCount + 1);
                break;
            default:
                break;
        }
    };

    const handleDecrement = (type) => {
        switch (type) {
            case 'adult':
                if (adultCount > 0) {
                    setAdultCount(adultCount - 1);
                }
                break;
            case 'child':
                if (childCount > 0) {
                    setChildCount(childCount - 1);
                }
                break;
            case 'baby':
                if (babyCount > 0) {
                    setBabyCount(babyCount - 1);
                }
                break;
            default:
                break;
        }
    };

    return (
        <div> 
            <h3>인원선택</h3><br />
            <div className='countButton'>
                <p className="leftAlign">성인</p>
                <span>원</span>
                <p className="rightAlign">
                    <button onClick={() => handleDecrement('adult')}>-</button>
                    <span>{adultCount}</span>
                    <button onClick={() => handleIncrement('adult')}>+</button>
                </p>
            </div>
            <div className='countButton'>
                <p className="leftAlign">어린이</p>
                <span>원</span>
                <p className="rightAlign">
                    <button onClick={() => handleDecrement('child')}>-</button>
                    <span>{childCount}</span>
                    <button onClick={() => handleIncrement('child')}>+</button>
                </p>
            </div>
            <div className='countButton'>
                <p className="leftAlign">유아</p>
                <span>원</span>
                <p className="rightAlign">
                    <button onClick={() => handleDecrement('baby')}>-</button>
                    <span>{babyCount}</span>
                    <button onClick={() => handleIncrement('baby')}>+</button>
                </p>
            </div>
            <hr />
            <div>
                <p>총 금액</p><p>원</p>
                <span>가격 상세</span>
                <p>
                    내용
                </p>
            </div>
            <hr />
            <div className='buttonDiv'>
                <button className='bookMarkButton'>예약하기</button>&nbsp;&nbsp;
                <button className='likeButton' onClick={handleLikeClick}>
                    <img src={liked ? '/images/like-colorIcon.svg' : '/images/like-emptyIcon.svg'} alt="heartIcon" />
                </button>
            </div>
        </div>
    );
}

export default Payment;

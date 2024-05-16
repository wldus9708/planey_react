import React, { useRef, useState } from "react";
import './InsertShop.css'
import { RiImageAddLine } from "react-icons/ri";

const InsertShop = () => {

    const [shopName, setShopName] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');
    const [notice, setNotice] = useState('');
    const [parking, setParking] = useState('');
    const [facilities, setFacilities] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [sale, setSale] = useState('');
    const [shopImages, setShopImages] = useState([]);
    const [warningImg, setWarningImg] = useState(false);

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to handle form submission (e.g., sending data to server)
        console.log('Form submitted!');
    };

    const fileInput = useRef(null);

    const handleFileUpload = (event) => {
        if (shopImages.length > 4) {
            setWarningImg(true);
            return;
        }

        const files = event.target.files;
        const newImages = [];

        for (let i = 0; i < files.length; i++) {

            const fileReader = new FileReader();
            fileReader.readAsDataURL(files[i]);

            fileReader.onload = () => {
                newImages.push(fileReader.result); // 이미지 추가
                // Check if all files are processed
                if (newImages.length === files.length) {
                    setShopImages([...shopImages, ...newImages]);

                }
            };
        }

    };


    return (
        <>
            <h1>업체 등록</h1>
            <div>
                <form onSubmit={handleSubmit} className="DEOK_MP_CL_insertShop">
                    {/*                 LEFT-SECTION                */}
                    <div className="DEOK_MP_CL_insertShop_left-section">
                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <span>업체명</span>
                            <input
                                type="text"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                            />
                        </div>

                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <span>주소</span>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <span>상세 주소</span>
                            <input
                                type="text"
                                value={addressDetail}
                                onChange={(e) => setAddressDetail(e.target.value)}
                            />
                        </div>
                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <span>업종</span>
                            <input
                                className="form-control"
                                value={notice}
                                onChange={(e) => setNotice(e.target.value)}
                                placeholder="한식, 중식, 일식, 퓨전 등등 라디오?"
                            />
                        </div>
                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <span>대표 키워드</span>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="비건, 애견동반, 글루텐프리 등등 체크박스?"
                            />
                        </div>
                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <span>주차 여부</span>
                            <input
                                type="text"
                                value={parking}
                                onChange={(e) => setParking(e.target.value)}
                                placeholder="라디오로 바꾸자 나중에"
                            />
                        </div>
                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <span>편의 시설</span>
                            <input
                                type="text"
                                value={facilities}
                                onChange={(e) => setFacilities(e.target.value)}
                            />
                        </div>
                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <span>최대 수용 인원</span>
                            <input
                                type="text"
                                value={maxCapacity}
                                onChange={(e) => setMaxCapacity(e.target.value)}
                                placeholder="숫자만 입력해주세요.(예시 : 150명 -> 150)"
                            />
                        </div>
                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <span>할인 정보</span>
                            <input
                                type="text"
                                value={sale}
                                onChange={(e) => setSale(e.target.value)}
                                placeholder="숫자만 입력해주세요.(예시 : 10% -> 10)"
                            />
                        </div>
                    </div>

                    {/*               RIGHT-SECTION               */}
                    <div className="DEOK_MP_CL_insertShop_right-section">


                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <span>공지 사항</span>
                            <textarea
                                className="form-control"
                                value={notice}
                                onChange={(e) => setNotice(e.target.value)}
                            />
                        </div>
                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <span>매장 소개</span>
                            <textarea
                                className="form-control"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="크기 고정 배경 없애거나 생각해보자
                            영업시간을 꼭 적어주세요!!"
                            />
                        </div>
                        <div className="DEOK_MP_CL_insertShop_input-box">
                            <b>대표 이미지 등록하기</b>
                            <RiImageAddLine
                                className="DEOK_MP_CL_insertShop_addPic"
                                onClick={() => { fileInput.current.click() }}
                            />
                            <p style={{ color: 'var(--color-danger)', display: warningImg ? 'block' : 'none' }}>최대 5개까지만 등록이 가능합니다.</p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileUpload}
                                ref={fileInput}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="DEOK_MP_CL_insertShop_images">
                            {/* Display uploaded images */}
                            {shopImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt=""
                                />
                            ))}
                        </div>
                    </div>
                    <div className="DEOK_MP_CL_insertShop_button-box">
                        <button type="submit" className="btn btn-primary">등록하기</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default InsertShop;
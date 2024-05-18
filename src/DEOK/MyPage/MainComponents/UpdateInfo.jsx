import React, { useRef, useState } from "react";
import './UpdateInfo.css';
import { Avatar } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";

const UpdateInfo = (props) => {
    const [cookies] = useCookies(['accessToken']);
    const { userInfo } = props;
    const [updateUserInfo, setUpdateUserInfo] = useState({
        nickname: userInfo.nickname,
        password: '',
        phone: userInfo.phone,
        memberImage: ''
    });
    const [profileImg, setProfileImg] = useState(userInfo.memberImage);
    const fileInput = useRef(null);

    const updateProfileImg = (e) => {
        if (e.target.files[0]) {
            setProfileImg(e.target.files[0].name)
            setUpdateUserInfo(prevstate => ({
                ...prevstate, memberImage: e.target.files[0].name
            }))

        } else {
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfileImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const handleUpdateClick = (event) => {
        event.preventDefault();

        axios.put('http://localhost:8988/member/mypage/updateinfo', updateUserInfo, {
            headers: {
                Authorization: `${cookies.accessToken}`
            }
        })
            .then(response => {
                console.log(response)
                alert("회원 정보 수정이 완료되었습니다.");
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
            })

    }

    return (
        <>
            <h1>회원 정보 수정</h1>
            <div className="DEOK_MP_CL_updateInfo">
                <div className="DEOK_MP_CL_updateInfo_form-box">
                    <div className="DEOK_MP_CL_updateInfo_editPic">
                        <Avatar
                            src={profileImg.startsWith('data:image') ? profileImg : `/images/${profileImg}`}
                            style={{ margin: '20px', cursor: "pointer", border: "1.5px solid black" }}
                            size={100}
                            onClick={() => { fileInput.current.click() }} />
                        <div>
                            <input
                                type='file'
                                style={{ display: 'none' }}
                                accept='image/*'
                                name='profile_img'
                                onChange={updateProfileImg}
                                ref={fileInput} />
                        </div>
                    </div>
                    <div className="DEOK_MP_CL_updateInfo_input-box">
                        <div>
                            <span>이메일</span>
                            <input
                                className="disabled"
                                type='text'
                                value={userInfo.email}
                                disabled
                            />
                        </div>
                        <div>
                            <span>이름</span>
                            <input
                                className="disabled"
                                type='text'
                                value={userInfo.name}
                                disabled
                            />
                        </div>
                        <div>
                            <span>닉네임</span>
                            <input
                                type='text'
                                value={updateUserInfo.nickname}
                                onChange={(event) => setUpdateUserInfo(prevState => ({
                                    ...prevState,
                                    nickname: event.target.value
                                }))}
                            />
                        </div>
                        <div>
                            <span>비밀번호</span>
                            <input
                                type='password'
                                name="password"
                                onChange={(event) => setUpdateUserInfo(prevState => ({
                                    ...prevState,
                                    password: event.target.value
                                }))}
                            />
                        </div>
                        <div>
                            <span>전화번호</span>
                            <input
                                type='text'
                                value={updateUserInfo.phone}
                                name="phone"
                                onChange={(event) => setUpdateUserInfo(prevState => ({
                                    ...prevState,
                                    phone: event.target.value
                                }))}
                            />
                        </div>
                        <div className="btn-update">
                            <button type="button">취소</button>
                            <button type="button" onClick={handleUpdateClick}>변경</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateInfo;

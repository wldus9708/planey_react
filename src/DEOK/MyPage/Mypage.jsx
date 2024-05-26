import React, { useEffect, useState } from 'react';
import './Mypage.css';
import 'material-icons';
import UpdateInfo from './MainComponents/UpdateInfo';
import DeleteMember from './MainComponents/DeleteMember';
import PaymentList from '../../SUNG/Payment/PaymentList';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WishList from './MainComponents/WishList';

const MpClient = () => {
    const [cookies] = useCookies(['accessToken']);
    const navigator = useNavigate();
    const [viewWhat, setViewWhat] = useState('paymentList');
    const [isUlHidden, setIsUlHidden] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!cookies.accessToken) {
            navigator('/login');
            alert("마이페이지를 이용하려면 먼저 로그인을 해주세요.");
        } else {
            axios.get("http://localhost:8988/member/mypage", {
                headers: {
                    Authorization: `${cookies.accessToken}`
                }
            })
                .then(response => {
                    setUserInfo(response.data);
                    setIsLoading(false);

                })
                .catch(error => {
                    console.log(error);
                    setIsLoading(false);
                });
        }
    }, [cookies.accessToken, navigator]);

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode-variables');
        const darkMode = document.querySelector('.dark-mode');
        darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
        darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
    };

    const clickMenu = (what) => {
        if (viewWhat === what) return;
        setViewWhat(what);
    };

    const showUlBox = () => {
        setIsUlHidden(!isUlHidden);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <img src="/loading.gif" alt="로딩 중" className="loading-image" />
                <p>로딩 중...</p>
            </div>
        );
    }

    return (
        <div className="DEOK_MP_CL_body">
            <div className="DEOK_MP_CL_container">
                <aside className="DEOK_MP_CL_aside">
                    <div className="DEOK_MP_CL_sidebar">
                        <div>
                            <Link to="/">
                                홈으로
                            </Link>
                        </div>
                        <div className="DEOK_MP_CL_profileBox">
                            <img className="DEOK_MP_CL_profile" src={"/images/" + userInfo.memberImage} alt='' />
                        </div>
                        <p className='DEOK_MP_CL_Nickname'>
                            {userInfo.nickname}
                        </p>
                        <p className={viewWhat === 'paymentList' ? 'active' : ''} onClick={() => clickMenu("paymentList")}>
                            <h3>결제 내역</h3>
                        </p>
                        <p className={viewWhat === 'updateInfo' ? 'active' : ''} onClick={() => clickMenu("updateInfo")}>
                            <h3>회원 정보 수정</h3>
                        </p>
                        <p className={viewWhat === 'wishList' ? 'active' : ''} onClick={() => clickMenu('wishList')}>
                            <h3>찜목록</h3>
                        </p>
                        <p
                            className={viewWhat === 'deleteMember' ? 'active' : ''}
                            onClick={() => clickMenu("deleteMember")}
                            style={{
                                position: 'absolute',
                                bottom: '50px',
                                color: 'var(--color-danger)',
                            }}>
                            <h3>회원 탈퇴</h3>
                        </p>
                    </div>
                </aside>
                {/* <!-- End of Sidebar Section --> */}

                {/* <!-- Main Content --> */}
                <main>
                    <div className='DEOK_MP_CL_main'>
                        {viewWhat === "updateInfo" && <UpdateInfo userInfo={userInfo} />}
                        {viewWhat === "paymentList" && <PaymentList userInfo={userInfo} />}
                        {viewWhat === "wishList" && <WishList />}
                        {viewWhat === "deleteMember" && <DeleteMember userInfo={userInfo} />}
                    </div>
                </main>
                {/* <!-- End of Main Content --> */}

                {/* <!-- Right Section --> */}
                <div className="DEOK_MP_CL_right-section">
                    <div className="nav">
                        <div className="dark-mode" onClick={toggleDarkMode}>
                            <span className="material-icons-sharp active">
                                light_mode
                            </span>
                            <span className="material-icons-sharp">
                                dark_mode
                            </span>
                        </div>
                    </div>

                    <div className="reminders">
                        <div className="notificationHeader">
                            <h2>알림</h2>
                            <span className="material-icons-sharp">
                                notifications_none
                            </span>
                        </div>

                        <div className="notification">
                            <div className="icon">
                                <span className="material-icons-sharp">
                                    volume_up
                                </span>
                            </div>
                            <div className="content">
                                <div className="info">
                                    <h3>Workshop</h3>
                                    <small className="text_muted">
                                        08:00 AM - 12:00 PM
                                    </small>
                                </div>
                                <span className="material-icons-sharp">
                                    more_vert
                                </span>
                            </div>
                        </div>

                        <div className="notification deactive">
                            <div className="icon">
                                <span className="material-icons-sharp">
                                    edit
                                </span>
                            </div>
                            <div className="content">
                                <div className="info">
                                    <h3>Workshop</h3>
                                    <small className="text_muted">
                                        08:00 AM - 12:00 PM
                                    </small>
                                </div>
                                <span className="material-icons-sharp">
                                    more_vert
                                </span>
                            </div>
                        </div>

                        <div className="notification add-reminder">
                            <div>
                                <span className="material-icons-sharp">
                                    add
                                </span>
                                <h3>Add Reminder</h3>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default MpClient;

import React, { useState } from "react";
import styles from "./Login_Signup.module.css";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { IoHomeOutline, IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { naverLoginUrl } from "../../SUNG/SocialNaver";
import Agreement from "../../YOUNG/member/Agreement";
import FindId from "../../YOUNG/member/findId"
import { Button, Modal } from 'react-bootstrap';
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from "./OAUTH";
import { logUserAction } from "../../BBS/Log/LogService"; // logUserAction 함수 임포트
import useUser from "../../BBS/Log/useUser"; // useUser 훅 임포트
import Survey from "../../Hye/dataConjugation";

const SignUpForm = () => {
    const user = useUser(); // 사용자 정보 가져오기
    const member_url = "http://localhost:8988/member/";
    const [cookies, setCookie] = useCookies([]);
    const navigator = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        nickname: "",
        phone: "",
        birth: "",
        role: "USER",
        agreedPersonal: 1
    });
    const [password, setPassword] = useState("");
    const [validErrorMsg, setValidErrorMsg] = useState({
        email: "",
        password: "",
        exactPassword: "",
        name: "",
        nickname: "",
        phone: "",
        birth: ""
    });
    const [showErrMsg, setShowErrMsg] = useState(false);
    const [birth, setBirth] = useState('');
    const [showTestComponent, setShowTestComponent] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);

    if (cookies.accessToken) {
        navigator('/');
    }

    function validateBirth(birth) {
        console.log(birth);
        if (!/^\d{6}-[1-4][\d*]{6}$/.test(birth)) {
            return false; // 7자리의 숫자 형식이 아님

        }

        let year = parseInt(birth.substring(0, 2));
        const month = parseInt(birth.substring(2, 4));
        const day = parseInt(birth.substring(4, 6));
        const gender = parseInt(birth.substring(7, 8));
        const currentYear = new Date().getFullYear();
        if (currentYear.toString().slice(-2)<year){
            if(gender>2){
                return false;
            }
        }

        if (gender === 1 || gender === 2) {
            year += 1900;
        } else if (gender === 3 || gender === 4) {
            year += 2000;
        }

        // 올바른 날짜 범위 확인
        if (year <currentYear - 100) {
            return false; // 최소 1940년 이상이어야 함
        }
        if (month < 1 || month > 12) {
            return false; // 올바른 월 범위 확인 (1~12)
        }
        if (day < 1 || day > 31) {
            return false; // 올바른 일 범위 확인 (1~31)
        }
        if (gender < 1 || gender > 4) {
            return false;
        }

        // 월에 따른 올바른 일 수 확인
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) {
            return false; // 올바른 일 수 초과
        }

        return true; // 모든 조건을 만족하면 유효
    }
    function validCheck(event) {
        const { name, value } = event.target;
        // eslint-disable-next-line default-case
        let valid = true;
        let errorMsg = "";
        switch (name) {
            case "email":
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(value)) {
                    errorMsg = "올바른 이메일 형식으로 입력해 주세요.";
                    valid = false;
                }
                break;

            case "password":
                const passwordRegex = /[a-zA-Z0-9!@#$%^&*()\-_=+`~]{8,20}/;
                if (!passwordRegex.test(value)) {
                    errorMsg = "특수문자, 영문, 숫자를 조합하여 8~20자를 입력해 주세요.";
                    valid = false;
                } else {
                    setPassword(value);
                }
                break;

            case "exactPassword":
                if (password !== value) {
                    errorMsg = "비밀번호가 다릅니다.";
                    valid = false;
                }
                break;

            case "name":
                if (value === "" || value === null) {
                    errorMsg = "필수 입력 사항입니다.";
                    valid = false;
                }
                break;

            case "nickname":
                if (value.length < 2) {
                    errorMsg = "필수 입력 사항입니다.";
                    valid = false;
                }
                break;

            case "phone":
                const phoneRegex = /^[0-9]{11}$/;
                if (!phoneRegex.test(value)) {
                    errorMsg = "올바른 핸드폰 번호를 입력해 주세요.";
                    valid = false;
                }
                break;

            case "birth":

                if (!validateBirth(value)) {
                    errorMsg = "올바른 생일 양식으로 입력해 주세요.";
                    valid = false;
                }
                break;
        }
        setValidErrorMsg(prevState => ({
            ...prevState,
            [name]: errorMsg
        }));

        setShowErrMsg(!valid);
        setIsFormValid(valid);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === "birth") {
            // birth 상태 업데이트
            setBirth(value);
        }
        console.log(formData);
    }

    const handleSignUpClick = async (event) => {
        event.preventDefault();
        if (!isFormValid) {
            console.log("폼이 유효하지 않습니다. 오류를 수정하고 다시 시도해 주세요.");
            return;
        }
        try {
            const response = await axios.post(member_url + "insert", formData);
            alert(response.data.message);

            // 회원가입 성공 플래그 설정
            localStorage.setItem('signupSuccess', 'true');

            setShowTestComponent(true);
        } catch (error) {
            console.log("에러 발생", error);
            alert(error.response.data.message);
        }
    };

    const handleCloseTestComponent = () => {
        setShowTestComponent(false);
        window.location.href = '/login'; // 모달을 닫을 때 로그인 페이지로 이동
    }
    const handleLogInClick = async (event) => {
        event.preventDefault();
        setUserLoginInfo({
            email: event.target.email.value,
            password: event.target.password.value
        });

        try {
            const response = await axios.post(member_url + "login", {
                email: userLoginInfo.email,
                password: userLoginInfo.password
            });

            setCookie("accessToken", response.data.accessToken);

            // 로그인 성공 플래그 설정
            localStorage.setItem('loginSuccess', 'true');


            // 유저 및 관리자 페이지 따로
            if (response.data.role === 'ADMIN') {
                window.location.href = 'http://localhost:4000';
            } else {
                navigator('/');
            }

        } catch (error) {
            console.log("로그인중 axios error 발생");
            console.log(error);
            setLoginFailed(true);
        }
    };

    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: ""
    });

    const [loginFailed, setLoginFailed] = useState(false);
    const [pwVisible, setPwVisible] = useState(false);
    const [pwIcon, setPwIcon] = useState("FaEyeSlash");

    const showPw = () => {
        setPwIcon(pwIcon === "FaEyeSlash" ? "FaEye" : "FaEyeSlash");
        setPwVisible(!pwVisible);
    };

    const [action, setAction] = useState("");
    const registerLink = () => {
        setModalShow(true);
        setAction(" active");
    };

    const [modalShow, setModalShow] = useState(false);

    const handleModalAgree = () => {
        setModalShow(false);
    };

    const handleModalOpen = () => {
        setModalShow(true);
    }

    const handleModalClose = () => {
        setModalShow(false);
    }

    const loginLink = () => {
        setAction("");
    };



    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setShowModal(false); // 모달 닫기
    };

    const formattedBirth = birth.length === 7 ? `${birth.slice(0, 6)}-${birth[6]}******` : birth;

    return (
        <div className={styles.body}>
            <div className={`${styles.wrapper} ${action && styles.active}`}>
                <Modal show={showTestComponent} onHide={handleCloseTestComponent} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>회원가입 완료</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Survey isOpen={showTestComponent} onRequestClose={handleCloseTestComponent} userBirth={birth} />
                    </Modal.Body>
                    <Modal.Footer>
                        {/*}
                    <Button variant="primary" onClick={handleCloseTestComponent}>
                        닫기
    </Button>*/}
                    </Modal.Footer>
                </Modal>
                <div className={`${styles["form-box"]} ${styles.login}`}>
                    <form onSubmit={handleLogInClick}>
                        <h1>
                            Login
                            <Link to="/" className={styles.to_home}>
                                <IoHomeOutline />
                            </Link>
                        </h1>
                        <div className={styles["input-box"]}>
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                onChange={(event) => setUserLoginInfo(prevInfo => ({ ...prevInfo, email: event.target.value }))} />
                            <FaEnvelope className={styles.icon} />
                        </div>
                        <div className={styles["input-box"]}>
                            <input
                                type={pwVisible ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                onChange={(event) => setUserLoginInfo(prevInfo => ({ ...prevInfo, password: event.target.value }))} />
                            {pwIcon === "FaEyeSlash" ?
                                <FaEyeSlash
                                    className={`${styles.icon} ${styles.pw}`}
                                    onClick={showPw}
                                />
                                :
                                <FaEye
                                    className={`${styles.icon} ${styles.pw}`}
                                    onClick={showPw}
                                />
                            }
                        </div>
                        <div className={`${styles.errBox} ${loginFailed ? '' : styles.hidden}`} >
                            <p>로그인 정보가 일치하지 않습니다.</p>
                        </div>

                        <button type="submit">Login</button>
                        <div className={styles.findOrSign}>
                            <div className={styles["remember-forgot"]}>
                                {/* <Link to='/findID'  className={styles["remember-forgot-id"]}> */}
                                <span
                                    style={{ cursor: 'pointer' }}
                                    variant="primary"
                                    onClick={handleOpenModal}
                                >아이디 찾기&nbsp;|&nbsp;</span>

                                <Modal
                                    show={showModal}
                                    onHide={handleCloseModal}
                                    animation={false}
                                    backdrop="static" // 모달 외부 클릭 시 닫히지 않도록 설정
                                    keyboard={false} // ESC 키 등 키보드 입력으로 닫히지 않도록 설정
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title>회원정보 찾기</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <FindId handleCloseModal={handleCloseModal} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseModal}> {/* 모달 닫기 */}
                                            취소
                                        </Button>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button variant="primary">확인</Button> {/* 확인 버튼 */}
                                    </Modal.Footer>
                                </Modal>
                                {/* </Link>     */}
                                {/* <span className={styles.bar}>|</span> */}

                                <Link to='/findPW01' className={styles["remember-forgot-pw"]}>
                                    <span>비밀번호 찾기</span>
                                </Link>
                            </div>

                            <div className={styles["register-link"]}>
                                <p onClick={registerLink}>계정이 없으신가요?</p>
                                <Agreement show={modalShow} onHide={handleModalClose} onAgree={handleModalAgree} /> {/* 모달 컴포넌트 */}
                                {/* {showAgreement && <Agreement />} 
                                김윤영 상태에 따라 Agreement 컴포넌트 표시 */}

                            </div>
                        </div>
                        <div className={styles.btn_sns_login}>
                            <Link to={naverLoginUrl}>
                                <img className={styles.naver} src='/images/btn_naver.svg' alt="naver" />
                            </Link>
                            <Link to={KAKAO_AUTH_URL}>
                                <img className={styles.kakao} src='/images/btn_kakao.svg' alt="kakao" />
                            </Link>
                            <Link to={GOOGLE_AUTH_URL}>
                                <img className={styles.google} src='/images/btn_google.svg' alt="google" />
                            </Link>
                        </div>
                    </form>
                </div>

                {/*                         회원가입                           */}

                <div className={`${styles["form-box"]} ${styles.register}`}>
                    <form onSubmit={handleSignUpClick}>
                        <h1><span onClick={loginLink} className={styles.to_login}>
                                <IoArrowBack />
                            </span>
                            회원가입
                            <Link to="/" className={styles.to_home}>
                                <IoHomeOutline />
                            </Link>
                        </h1>
                        <div className={styles["input-box"]}>
                            <input
                                type="email"
                                placeholder="이메일"
                                name="email"
                                onBlur={validCheck}
                                onChange={handleChange}
                            />
                            <div className={`${styles.errBoxSignUp} ${showErrMsg ? '' : styles.hidden}`} >
                                <p>{validErrorMsg.email}</p>
                            </div>
                        </div>
                        <div className={styles["input-box"]}>
                            <input
                                type="password"
                                placeholder="비밀번호"
                                name="password"
                                onBlur={validCheck}
                                onChange={handleChange}
                            />
                            <div className={`${styles.errBoxSignUp} ${showErrMsg ? '' : styles.hidden}`} >
                                <p>{validErrorMsg.password}</p>
                            </div>
                        </div>
                        <div className={styles["input-box"]}>
                            <input
                                type="password"
                                placeholder="비밀번호 확인"
                                name="exactPassword"
                                onBlur={validCheck}
                            />
                            <div className={`${styles.errBoxSignUp} ${showErrMsg ? '' : styles.hidden}`} >
                                <p>{validErrorMsg.exactPassword}</p>
                            </div>
                        </div>
                        <div className={styles["input-box"]}>
                            <input
                                type="text"
                                placeholder="성함"
                                name="name"
                                onBlur={validCheck}
                                onChange={handleChange}
                            />
                            <div className={`${styles.errBoxSignUp} ${showErrMsg ? '' : styles.hidden}`} >
                                <p>{validErrorMsg.name}</p>
                            </div>
                        </div>
                        <div className={styles["input-box"]}>
                            <input
                                type="text"
                                placeholder="닉네임"
                                name="nickname"
                                onBlur={validCheck}
                                onChange={handleChange}
                            />
                            <div className={`${styles.errBoxSignUp} ${showErrMsg ? '' : styles.hidden}`} >
                                <p>{validErrorMsg.nickname}</p>
                            </div>
                        </div>
                        <div className={styles["input-box"]}>
                            <input
                                type="text"
                                placeholder="연락처 ( - 없이 번호만 입력해 주세요.)"
                                name="phone"
                                onBlur={validCheck}
                                onChange={handleChange}
                            />
                            <div className={`${styles.errBoxSignUp} ${showErrMsg ? '' : styles.hidden}`} >
                                <p>{validErrorMsg.phone}</p>
                            </div>
                        </div>
                        <div className={styles["input-box"]}>
                            <input
                                type="text"
                                placeholder="생년월일 (예시 : 9505161)"
                                name="birth"
                                value={formattedBirth}
                                onBlur={validCheck}
                                onChange={handleChange}
                            />
                            <div className={`${styles.errBoxSignUp} ${showErrMsg ? '' : styles.hidden}`} >
                                <p>{validErrorMsg.birth}</p>
                            </div>
                        </div>

                        {/* <div className={styles["remember-forgot"]}>
                            <label>
                                <input
                                    type="checkbox"
                                    className="showPw"
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setRole("ADMIN");
                                        } else {
                                            setRole("USER");
                                        }
                                    }}
                                />
                                점주님 체크~~
                            </label>
                        </div> */}
                        <button type="submit">가입</button>

                        {/* <div className={styles["register-link"]}>
                            <p onClick={loginLink}>로그인폼 ㄱㄱ</p>
                        </div> */}
                    </form>
                </div>
            </div>
            <Agreement
                show={modalShow}
                onHide={handleModalClose}
                onAgree={handleModalAgree}
            />
        </div>
    );
};

export default SignUpForm;
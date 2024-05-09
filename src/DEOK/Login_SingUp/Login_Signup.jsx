import React, { useState } from "react";
import styles from "./Login_Signup.module.css";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { naverLoginUrl } from "../../SUNG/SocialNaver";
import Agreement from "../../YOUNG/Agreement";
import FindId from "../../YOUNG/findId"
import { Button, Modal } from 'react-bootstrap';

const SignUpForm = () => {

    const member_url = "http://localhost:8988/member/";

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

    function validateBirth(birth) {
        // birthDate 형식: YYYY/MM/DD
        const parts = birth.split('/');
        if (parts.length !== 3) {
            return false; // 올바른 형식이 아님
        }

        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);

        // 올바른 날짜 범위 확인
        if (year < 1940) {
            return false; // 최소 1940년 이상이어야 함
        }
        if (month < 1 || month > 12) {
            return false; // 올바른 월 범위 확인 (1~12)
        }
        if (day < 1 || day > 31) {
            return false; // 올바른 일 범위 확인 (1~31)
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
        switch (name) {
            case "email":
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(value)) {
                    setShowErrMsg(true);
                    setValidErrorMsg({ email: "올바른 이메일 형식으로 입력해 주세요." });
                } else {
                    setShowErrMsg(false);
                }
                break;

            case "password":
                const passwordRegex = /[a-zA-Z0-9!@#$%^&*()\-_=+`~]{8,20}/;
                if (!passwordRegex.test(value)) {
                    setValidErrorMsg({ password: "특수문자, 영문, 숫자를 조합하여 8~20자를 입력해 주세요." });
                    setShowErrMsg(true);
                } else {
                    setShowErrMsg(false);
                    setPassword(value);
                }
                break;

            case "exactPassword":
                if (password !== value) {
                    setValidErrorMsg({ exactPassword: "비밀번호가 다릅니다." });
                    setShowErrMsg(true);
                } else {
                    setShowErrMsg(false);
                }
                break;

            case "name":
                if (value === "" || value === null) {
                    setValidErrorMsg({ name: "필수 입력 사항입니다." });
                    setShowErrMsg(true);
                } else {
                    setShowErrMsg(false);
                }
                break;

            case "nickname":
                if (value.length < 2) {
                    setValidErrorMsg({ nickname: "필수 입력 사항입니다." });
                    setShowErrMsg(true);
                } else {
                    setShowErrMsg(false);
                }
                break;

            case "phone":
                const phoneRegex = /^[0-9]{11}$/;
                if (!phoneRegex.test(value)) {
                    setValidErrorMsg({ phone: "올바른 핸드폰 번호를 입력해 주세요." });
                    setShowErrMsg(true);
                } else {
                    setShowErrMsg(false);
                }
                break;

            case "birth":
                if (!validateBirth(value)) {
                    setValidErrorMsg({ birth: "올바른 생일 양식으로 입력해 주세요." })
                    setShowErrMsg(true);
                } else {
                    setShowErrMsg(false);
                }
                break;
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSignUpClick = (event) => {
        event.preventDefault();

        axios
            .post(member_url + "insert", formData)
            .then((response) => {
                window.location.href = '/login';
            })
            .catch((error) => {
                console.log("에러 발생", error)
            });
    }

    //                        로그인 화면 관련 로직                         //
    const [userLoginInfo, setUserLoginInfo] = useState({
        email: "",
        password: ""
    });

    //          state : 로그인 에러 메시지              //
    const [loginFailed, setLoginFailed] = useState(false);

    //          state, function : 비밀번호 보기, 안보기 아이콘 클릭           //
    const [pwVisible, setPwVisible] = useState(false);
    const [pwIcon, setPwIcon] = useState("FaEyeSlash");

    const showPw = () => {
        setPwIcon(pwIcon === "FaEyeSlash" ? "FaEye" : "FaEyeSlash");
        setPwVisible(!pwVisible);
    };

    //          state,function : 로그인 폼 <---> 회원가입 폼         //
    const [action, setAction] = useState("");




    const registerLink = () => {

        setModalShow(true); // 김윤영 회원가입 버튼 클릭 시 모달 표시
        console.log("setModalShow called"); //김윤영 함수 호출 확인
        setAction(" active");

    };

    // 김윤영
    const [modalShow, setModalShow] = useState(false); // 모달 표시 여부
   
    const handleModalAgree = () => {
        setModalShow(false); // 모달 닫기
    };

    const handleModalOpen = () => {
        setModalShow(true); // 모달 닫기
    }

    const handleModalClose = () => {
        setModalShow(false); // 모달 닫기
    }
    // 끝



    const loginLink = () => {
        setAction("");
    };
    //                          쿠키 상태                          //
    const [cookies, setCookie] = useCookies([]);

    //          네비게이터          //
    const navigator = useNavigate();



    //                      로그인 버튼 클릭                    //
    const handleLogInClick = (event) => {
        event.preventDefault();
        setUserLoginInfo({
            email: event.target.email.value,
            password: event.target.password.value
        })

        axios.post(member_url + "login", {
            email: userLoginInfo.email,
            password: userLoginInfo.password
        })
            .then((response) => {
                setCookie("accessToken", response.data.accessToken);
                setCookie("refreshToken", response.data.refreshToken);
                navigator('/');
            })
            .catch((error) => {
                console.log("로그인중 axios error 발생");
                console.log(error);
                setLoginFailed(true);
            });
    }

    const [showModal, setShowModal] = useState(false); // 모달 상태 관리

    const handleOpenModal = () => {
      setShowModal(true); // 모달 열기
    };
  
    const handleCloseModal = () => {
      setShowModal(false); // 모달 닫기
    };
  

    return (
        <div className={styles.body}>
            <div className={`${styles.wrapper} ${action && styles.active}`}>
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
                                        <FindId />
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
                            <Link to="/login/Socialkakao">
                                <img className={styles.kakao} src='/images/btn_kakao.svg' alt="kakao" />
                            </Link>
                            <Link to="/">
                                <img className={styles.google} src='/images/btn_google.svg' alt="google" />
                            </Link>
                        </div>
                    </form>
                </div>

                {/*                         회원가입                           */}

                <div className={`${styles["form-box"]} ${styles.register}`}>
                    <form onSubmit={handleSignUpClick}>
                        <h1>
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
                                placeholder="생년월일 (예시 : 1995/05/16)"
                                name="birth"
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

                        <div className={styles["register-link"]}>
                            <p onClick={loginLink}>로그인폼 ㄱㄱ</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
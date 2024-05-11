import React, { useState } from "react";
import styles from "./Login_Signup.module.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { PiCalendarBold } from "react-icons/pi";
import { GiSmartphone } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import kakao from "../../../images/assets/btn_kakao.svg";
import google from "../../../images/assets/btn_google.svg";
import naver from "../../../images/assets/btn_naver.svg";
import axios from "axios";

const SignUpForm = () => {
  const [action, setAction] = useState("");

  const registerLink = () => {
    setAction(" active");
  };

  const loginLink = () => {
    setAction("");
  };

  // 비밀번호 보기 옵션을(로그인 체크박스) 관리하기 위한 상태와 상태를 업데이트하는 함수를 선언합니다.
  const [pwVisible, setPwVisible] = useState(false); // 이게 누르면 반전되어서 true로 바뀜

  // 비밀번호 보기 옵션을 활성화 또는 비활성화하는 함수를 정의합니다.
  const showPw = () => {
    // 현재 pwVisible 상태의 값을 반전시켜서 비밀번호 보기 상태를 토글합니다.
    setPwVisible(!pwVisible);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [role, setRole] = useState(""); // 밑에서 체크하면 ADMIN 안하면 USER

  // 회원가입 유효성 검사
  function validateInputs() {
    const errors = {};

    // 이메일 유효성 검사
    if (!email.trim()) {
      errors.email = "이메일을 입력해주세요.";
      alert(errors.email);
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email)
    ) {
      errors.email =
        "유효한 이메일을 입력해주세요.\n" +
        "1. @를 포함해야합니다.\n" +
        "2. .com과 같은 올바른 이메일 형식이어야 합니다.";
      alert(errors.email);
    } else {
      // 비밀번호 유효성 검사
      if (!password) {
        errors.password = "비밀번호를 입력해주세요!!!!";
        alert(errors.password);
      } else if (password.length < 6) {
        errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
        alert(errors.password);
      } else {
        // 비밀번호 확인 유효성 검사
        if (password !== confirmPassword) {
          errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
          alert(errors.confirmPassword);
        } else {
          // 닉네임 유효성 검사
          if (!nickname.trim()) {
            errors.nickname = "닉네임을 입력해주세요.";
            alert(errors.nickname);
          } else if (nickname.trim().length < 7) {
            errors.nickname = "닉네임은 7개 이상의 문자를 포함해야 합니다.";
            alert(errors.nickname);
          } else {
            // 전화번호 유효성 검사
            if (!phoneNumber.trim()) {
              errors.phoneNumber = "전화번호를 입력해주세요.";
              alert(errors.phoneNumber);
            } else if (!/^[0-9]{11}$/.test(phoneNumber)) {
              errors.phoneNumber = "유효한 전화번호 11자리를 입력해주세요. ";
              alert(errors.phoneNumber);
            } else {
              // 생년월일 유효성 검사
              if (!birthDate.trim()) {
                errors.birthDate = "생년월일을 입력해주세요.";
                alert(errors.birthDate);
              } else {
                // 생년월일 형식(YYYY-MM-DD) 검사
                const birthDateRegex = /^\d{4}\d{2}\d{2}$/;
                if (!birthDateRegex.test(birthDate)) {
                  errors.birthDate =
                    "유효한 생년월일을 입력해주세요. (YYYY-MM-DD)";
                  alert(errors.birthDate);
                } else {
                  // 생년월일 범위(1900년 이후) 검사
                  const year = parseInt(birthDate.substring(0, 4), 10);
                  if (year < 1900 || year > new Date().getFullYear()) {
                    errors.birthDate = "유효한 생년월일을 입력해주세요.";
                    alert(errors.birthDate);
                  }
                }
              }
            }
          }
        }
      }
    }

    return errors;
  }

  // 백배승 회원가입 핸들러
  const handleSignUpClick = (event) => {
    event.preventDefault(); // 기본 제출 동작을 막습니다.

    const errors = validateInputs(); // 입력값 유효성을 검사합니다.
    if (Object.keys(errors).length === 0) {
      // 에러가 없는 경우에만 회원가입 처리를 합니다.
      console.log(
        "백배승 Login_Signup.jsx + handleSignUpClick호출 : 회원가입 버튼 클릭"
      );
      axios
        .post("http://localhost:8888/member/insert", {
          // Spring 서버의 API 엔드포인트로 변경
          email: email, // 이메일 필드에는 useState로 관리한 상태를 사용
          password: password, // 비밀번호 필드에는 useState로 관리한 상태를 사용
          nickname: nickname, // 닉네임 필드에는 useState로 관리한 상태를 사용
          phone: phoneNumber, // 전화번호 필드에는 useState로 관리한 상태를 사용
          birth: birthDate, // 생년월일 필드에는 useState로 관리한 상태를 사용
          role: role, // 밑에서 체크하면 ADMIN 안하면 USER
        })
        .then((response) => {
          // Handle success.
          console.log("성공적으로 데이터가 전달됨...");
          alert("회원가입 성공!");
          console.log("User profile", response.data.user);
          console.log("User token", response.data.jwt);
          window.location.href = "/"; // 메인 페이지로 이동
        })
        .catch((error) => {
          // Handle error.
          console.log("회원가입 error occurred:", error.response);
          alert("회원가입 실패!");
          window.location.href = "login";
        });
    } else {
      // 에러가 있는면 폼 제출 막음
      event.preventDefault();

      alert("입력 정보를 다시 확인해주세요....");
    }
  };

  return (
    <div className={styles.body}>
      <div className={`${styles.wrapper} ${action && styles.active}`}>
        <div className={`${styles["form-box"]} ${styles.login}`}>
          <form action="/member/login">
            <h1>
              로그인
              <Link to="/" className={styles.to_home}>
                <IoHomeOutline />
              </Link>
            </h1>
            <div className={styles["input-box"]}>
              <input type="text" placeholder="이메일" />
              <FaEnvelope className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input
                type={pwVisible ? "text" : "password"}
                placeholder="비밀번호"
              />
              <FaLock className={styles.icon} />
            </div>

            <div className={styles["remember-forgot"]}>
              <label>
                <input type="checkbox" className="showPw" onClick={showPw} />
                비밀번호 보기
              </label>
              <p>비밀번호를 잊어버리셨나요?</p>
            </div>

            <button type="submit">로그인</button>

            <div className={styles["register-link"]}>
              <p onClick={registerLink}>계정이 없으신가요?</p>
            </div>
            <div className={styles.btn_sns_login}>
              <Link to="/">
                <img className={styles.naver} src={naver} alt="naver" />
              </Link>
              <Link to="/">
                <img className={styles.kakao} src={kakao} alt="kakao" />
              </Link>
              <Link to="/">
                <img className={styles.google} src={google} alt="google" />
              </Link>
            </div>
          </form>
        </div>

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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <FaEnvelope className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <FaLock className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <FaLock className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
              />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="연락처 ( - 빼고 번호만 입력해 주세요.)"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              <GiSmartphone className={`${styles.icon} ${styles.phone}`} />
            </div>
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="생년월일 (예시 : 1995/05/16)"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
              />
              <PiCalendarBold className={styles.icon} />
            </div>

            <div className={styles["remember-forgot"]}>
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
            </div>
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

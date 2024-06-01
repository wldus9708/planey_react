import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from './findPW02.module.css';
import axios from 'axios';

const FindPW02 = (props) => {
  const { email } = props;
  const [authMethod, setAuthMethod] = useState('phone');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');


  const [warnings, setWarnings] = useState({
    name: '',
    phone: '',
    code: ''
  });

  const handleTabChange = (key) => {
    setAuthMethod(key);
    setWarnings({ name: '', phone: '', code: '' }); // 탭 변경 시 경고 메시지 초기화
    // 입력 필드 초기화
    setName('');
    setPhone('');
    setCode('');
  };

  const handleFindId = async () => {
    let newWarnings = { name: '', phone: '' };

    if (name.trim() === '') {
      newWarnings.name = '이름을 입력하세요.';
    }

    if (phone.trim() === '') {
      newWarnings.phone = '휴대전화를 입력하세요.';
    }


    // 경고 메시지 상태 업데이트
    setWarnings(newWarnings);

    // 경고 메시지가 없는 경우에만 인증 작업 진행
    if (Object.values(newWarnings).every((warning) => warning === '')) {
      let isValid = await checkPhoneNumberExists(name, phone);

      // 회원 정보가 일치하는 경우에만 인증코드 발송
      if (isValid) {
        // 인증번호 발송 로직

      } else {
        alert('가입된 정보와 일치하지 않습니다.');
        return;
      }
    }

  };




  const sendVerificationCode = async (phone) => {
    try {
      const response = await axios.get(`http://localhost:8988/test/sendSms/${phone}`);
      console.log(response);
      if (response.status === 200) {
        alert('인증번호가 전송되었습니다.');
      } else {
        console.error('Failed to send verification code:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };


  const checkPhoneNumberExists = async (name, phone) => {
    try {
      const response = await fetch(`http://localhost:8988/test/checkNameAndPhone?name=${name}&phone=${phone}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // JSON 데이터에서 false 값이 있는지 확인
        const isAllValid = Object.values(data).every((value) => value === true);
        if (isAllValid) {
          // 모든 값이 true일 경우에만 인증번호 발송
          sendVerificationCode(phone);
          return true;
        } else {

          return false;
        }
      } else {
        console.error('Failed to check phone number:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error checking phone number:', error);
      return false;
    }
  };


  const handleVerifyCode = async () => {
    if (code.trim() === '') {
      setWarnings({ ...warnings, code: '인증 코드를 입력하세요.' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8988/test/code', null, {
        params: {
          phone: phone,
          code: code
        }
      });
      if (response.status === 200) {

        sendTemporaryPassword(email); // 이메일로 임시 비밀번호 발급 함수 호출
      } else {
        alert('유효하지 않은 인증번호 입니다.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('유효하지 않은 인증번호 입니다.');
    }
  };

  const sendTemporaryPassword = async (email) => {
    try {
      const passwordResponse = await axios.post('http://localhost:8988/check/changePassword', null, {
        params: {
          email: email
        }
      });

      const temporaryPassword = passwordResponse.data;
      console.log("Generated temporary password: ", temporaryPassword);

      await axios.post('http://localhost:8988/check/sendEmail', null, {
        params: {
          email: email,
          password: temporaryPassword
        }
      });
      alert('인증번호가 확인되었습니다. 가입된 이메일로 임시비밀번호가 발급 되었습니다. 로그인 후 마이페이지에서 비밀번호를 변경후 사용해주세요.');

      // 임시 비밀번호 발급 후 로그인 페이지로 이동
      window.location.href = '/login/';


    } catch (error) {
      console.error('Error generating or sending temporary password:', error);
      alert('임시 비밀번호를 전송하는 도중 오류가 발생했습니다.');
    }
  };


  return (

    <div className={Styles.findPWPage}>
      <div className={Styles.findPWContainer}>
        <h5>비밀번호 찾기</h5>
        <Nav variant="tabs" activeKey={authMethod} onSelect={handleTabChange}>
          <Nav.Item>
            <Nav.Link eventKey="phone">휴대전화로 인증</Nav.Link>
          </Nav.Item>
        </Nav>

        <div className={authMethod === 'phone' ? "phone-auth" : "email-auth"}>
          <label className={Styles.authLabel}>이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            className={Styles.authInput}
            type="text"
            placeholder="이름을 입력하세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {warnings.name && <div className={Styles.warning}>{warnings.name}</div>}
          <br />
          <label className={Styles.authLabel}>휴대전화</label>
          <input
            className={Styles.authInput}
            type="text"
            placeholder="휴대전화 '-'를 제외하고 입력하세요."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {warnings.phone && <div className={Styles.warning}>{warnings.phone}</div>}
          <br />
          <Button
            className={Styles.authButton}
            onClick={handleFindId}
          >
            인증코드 발송
          </Button>
          <br />
          <label className={Styles.authLabel}>인증코드</label>
          <input
            className={Styles.authInput}
            type="text"
            placeholder="인증 코드를 입력하세요."
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (warnings.code) {
                setWarnings({ ...warnings, code: '' });
              }
            }}
          />
          {warnings.code && <div className={Styles.warning}>{warnings.code}</div>}
          <Button
            className={Styles.authButton}
            type="button"
            onClick={handleVerifyCode}

          >
            인증코드 확인
          </Button>

          <br />
        </div>
      </div>
    </div>
  );
};

export default FindPW02;

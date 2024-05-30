import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from './findPW02.module.css';

const FindPW02 = () => {
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

    // if (code.trim() === '') {
    //   newWarnings.code = '인증 코드를 입력하세요.';
    // }

    // 경고 메시지 상태 업데이트
    setWarnings(newWarnings);

    // 경고 메시지가 없는 경우에만 인증 작업 진행
    if (Object.values(newWarnings).every((warning) => warning === '')) {
      let isValid = await checkPhoneNumberExists(name, phone);

      // 회원 정보가 일치하는 경우에만 인증코드 발송
      if (isValid) {
        // 인증번호 발송 로직
        //유녕씨 여기서 메세지 보내세요.
      } else {
        alert('가입된 정보와 일치하지 않습니다.');
        return;
      }
    }

  };

  const sendVerificationCode = async (phone) => {
    try {
      const response = await fetch(`http://localhost:8988/sendSms/${phone}`);
      if (response.ok) {
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
      // console.log(response.ok);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        //리스빤스가  ok면 이 함수 호출 이 함수는 이제 인증번호 발송 해야 하는 차례
        sendVerificationCode(phone);
        return true;
      } else {
        console.error('Failed to check phone number:', response.statusText);

      }
    } catch (error) {
      console.error('Error checking phone number:', error);
      return false;
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
            onChange={(e) => setCode(e.target.value)}
          />
          {warnings.code && <div className={Styles.warning}>{warnings.code}</div>}
          <Button
            className={Styles.authButton}
            type="button"
          // onClick={handleFindId}
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

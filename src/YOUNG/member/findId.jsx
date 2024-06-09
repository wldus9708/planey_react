import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './findId.module.css'; // CSS 모듈 임포트
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FindId = ({ handleCloseModal }) => {
  const [authMethod, setAuthMethod] = useState('phone'); // 기본 인증 방법
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const [warnings, setWarnings] = useState({
    name: '',
    phone: '',
    code: ''
  });

  const handleTabChange = (key) => {
    setAuthMethod(key);
    setWarnings({ name: '', phone: '', code: '' }); // 탭 변경 시 경고 메시지 초기화
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

    setWarnings(newWarnings);

    if (Object.values(newWarnings).every((warning) => warning === '')) {
      let isValid = await checkPhoneNumberExists(name, phone);

      if (isValid) {
        sendVerificationCode(phone);
      } else {
        alert('가입된 정보와 일치하지 않습니다.');
        return;
      }
    }
  };

  const handleVerifyCode = async () => {
    if (code.trim() === '') {
      setWarnings({ ...warnings, code: '인증 코드를 입력하세요.' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8988/test/codeID', null, {
        params: {
          phone: phone,
          code: code
        }
      });
      if (response.status === 200) {
        alert(`인증번호가 확인되었습니다. 이메일: ${response.data}`);
        handleCloseModal();
      } else {
        alert('유효하지 않은 인증번호 입니다.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('유효하지 않은 인증번호 입니다.');
    }
  };

  const sendVerificationCode = async (phone) => {
    try {
      const response = await axios.get(`http://localhost:8988/test/sendSms/${phone}`);
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
        const isAllValid = Object.values(data).every((value) => value === true);
        if (isAllValid) {
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

  return (
    <div className={styles.findIdPage}>
      <div className={styles.findIdContainer}>
        <h5>아이디 찾기</h5>
        <Nav variant="tabs" activeKey={authMethod} onSelect={handleTabChange}>
          <Nav.Item>
            <Nav.Link eventKey="phone">휴대전화로 인증</Nav.Link>
          </Nav.Item>
        </Nav>

        {authMethod === 'phone' && (
          <div className="phone-auth">
            <label className={styles.authLabel}>이름</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {warnings.name && <p className={styles.warning}>{warnings.name}</p>}
            <br />
            <label className={styles.authLabel}>휴대전화</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="휴대전화 '-'를 제외하고 입력하세요."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {warnings.phone && <p className={styles.warning}>{warnings.phone}</p>}
            <Button className={styles.authButton} onClick={handleFindId}>
              인증코드 발송
            </Button>
            <br />
            <label className={styles.authLabel}>인증코드</label>
            <input
              className={styles.authInput}
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
            {warnings.code && <p className={styles.warning}>{warnings.code}</p>}
            <Button className={styles.authButton} type="button" onClick={handleVerifyCode}>
              인증코드 확인
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindId;

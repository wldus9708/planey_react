import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './findId.module.css'; // CSS 모듈 임포트

const FindId = () => {
  const [authMethod, setAuthMethod] = useState('phone'); // 기본 인증 방법
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [authCode, setAuthCode] = useState(''); // 인증 코드 상태 추가

  const handleTabChange = (key) => {
    setAuthMethod(key); // 탭 변경 시 상태 업데이트
  };

  const handleFindId = () => {
    if (authMethod === 'phone') {
      console.log('휴대전화로 전송된 인증 코드:', phone);
      // 인증 코드 발송 로직 추가
    } else if (authMethod === 'email') {
      console.log('이메일로 전송된 인증 코드:', email);
      // 이메일 인증 코드 발송 로직 추가
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
          <Nav.Item>
            <Nav.Link eventKey="email">이메일로 인증</Nav.Link>
          </Nav.Item>
        </Nav>

       {/* 휴대전화 인증 폼 */}
       {authMethod === 'phone' && (
          <div className="phone-auth">
            <label className={styles.authLabel}>이름</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)} // onChange 추가
            />
            <br />
            <label className={styles.authLabel}>휴대전화</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="휴대전화 '-'를 제외하고 입력하세요."
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // onChange 추가
            />
            <Button
              className={styles.authButton}
              onClick={handleFindId}
            >
              인증코드 발송
            </Button>
            <br />
            <label className={styles.authLabel}>인증코드</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="인증 코드를 입력하세요."
              value={authCode} // 인증 코드 상태 연결
              onChange={(e) => setAuthCode(e.target.value)} // onChange 추가
            />
            <Button
              className={styles.authButton}
              type="button"
            >
              인증코드 확인
            </Button>
          </div>
        )}

        {authMethod === 'email' && (
          <div className="email-auth">
            <label className={styles.authLabel}>이름</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)} // onChange 추가
            />
            <br />
            <label className={styles.authLabel}>이메일</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)} // onChange 추가
            />
            <Button
              className={styles.authButton}
              onClick={handleFindId}
            >
              인증코드 발송
            </Button>
            <br />
            <label className={styles.authLabel}>인증코드</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="인증 코드를 입력하세요."
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)} // onChange 추가
            />
            <Button
              className={styles.authButton}
              type="button"
            >
              인증코드 확인
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindId;

import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './findId.module.css';

const FindId = () => {
  const [authMethod, setAuthMethod] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleTabChange = (key) => {
    setAuthMethod(key);
  };

  const handleFindId = () => {
    if (authMethod === 'phone') {
      console.log('인증을 위해 전송된 휴대전화:', phone);
    } else if (authMethod === 'email') {
      console.log('인증을 위해 전송된 이메일:', email);
    }
  };

  return (
    <div className={styles.findIdPage}>
      <div>
        <h4>회원 정보 찾기</h4>
        <h5>아이디 찾기</h5>
        <Nav variant="tabs" activeKey={authMethod} onSelect={handleTabChange}>
          <Nav.Item>
            <Nav.Link eventKey="phone">휴대전화로 인증</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="email">이메일로 인증</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* 탭에 따라 다른 인증 폼 표시 */}
        {authMethod === 'phone' && (
          <div className="phone-auth">
            <label className={styles.authLabel}>이름
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
            <br />
            <label className={styles.authLabel}>휴대전화</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="휴대전화 '-'를 제외하고 입력하세요."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button className={styles.authButton} onClick={handleFindId}>인증코드 발송</Button>
            <br />
            <label className={styles.authLabel}>인증코드</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="인증 코드를 입력하세요."
            />
            <Button className={styles.authButton} type="button">인증코드 확인</Button>
          </div>
        )}

        {authMethod === 'email' && (
          <div className="email-auth">
            <label className={styles.authLabel}>이름
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label className={styles.authLabel}>이메일
            &nbsp;&nbsp;</label>
            <input
              className={styles.authInput}
              type="text"
              placeholder="등록된 이메일을 입력하세요."
              value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <Button className={styles.authButton} onClick={handleFindId}>인증코드 발송</Button>
            <br />
            <label className={styles.authLabel}>인증코드</label>
              <input
                className={styles.authInput}
                type="text"
                placeholder="인증 코드를 입력하세요."
              />
              <Button className={styles.authButton} type="button">인증코드 확인</Button>
          </div>
        )}
    </div>
    </div>

  );
};

export default FindId;
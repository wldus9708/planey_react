import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import  Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from './findPW02.module.css'; 


const FindPW02 = () => {
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
    <div className={Styles.findPWPage}>
      <div className={Styles.findPWContainer}> 
        <h5>비밀번호 찾기</h5>
        <Nav variant="tabs" activeKey={authMethod} onSelect={handleTabChange}>
          <Nav.Item>
            <Nav.Link eventKey="phone">휴대전화로 인증</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="email">이메일로 인증</Nav.Link>
          </Nav.Item>
        </Nav>

        {authMethod === 'phone' && (
          <div className="phone-auth">
          <label className={Styles.authLabel}>이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> {/* 클래스 적용 */}
            <input
              className={Styles.authInput} 
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
            <br />
            <label className={Styles.authLabel}>휴대전화</label>
            <input
              className={Styles.authInput} 
              type="text"
              placeholder="휴대전화 '-'를 제외하고 입력하세요."
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
            />
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
              onChange={(e) => console.log(e.target.value)} // 수정 가능한 필드
            />
            <Button
              className={Styles.authButton}
              type="button"
            >
              인증코드 확인
            </Button>
            <br />
          </div>
        )}

        {authMethod === 'email' && (
          <div className="email-auth">
            <label className={Styles.authLabel}>이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              className={Styles.authInput} 
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
            <br />
            <label className={Styles.authLabel}>이메일</label>
            <input
              className={Styles.authInput} 
              type="text"
              placeholder="등록된 이메일을 입력하세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
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
              onChange={(e) => console.log(e.target.value)} // 수정 가능하도록
            />
            <Button
              className={Styles.authButton}
              type="button"
            >
              인증코드 확인
            </Button>
            <br />
          </div>
        
        )}
      </div>
    </div>
  );
};

export default FindPW02;

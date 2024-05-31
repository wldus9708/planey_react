import { Button, Modal, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Styles from './findPW01.module.css';
import { Link } from "react-router-dom";
import FindPW02 from "./findPW02";
import { GrAnalytics } from 'react-icons/gr';
import NavBar from '../../CKH/Components/Navbar/Navbar'

const FindPwPage = () => {
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리
  const [email, setEmail] = useState(''); // 이메일 입력 상태
  const [warning, setWarning] = useState(''); // 경고 메시지 상태


  const handleOpenModal = async () => {
    if (email.trim() === '') {
      setWarning('이메일을 입력하세요.'); // 이메일이 비어 있는 경우 경고 메시지 설정
      return;
    }
    const isValid = await checkEmail(email); // 이메일 유효성 검사
    if (isValid) {
      setShowModal(true); // 모달 열기
      setWarning(''); // 경고 메시지 초기화
    } else {
      setWarning('존재하지 않는 이메일입니다.'); // 경고 메시지 설정
    }
  };


  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const checkEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:8988/test/email?email=${email}`);
      if (response.ok) {
        // 서버 응답이 성공적으로 도착한 경우
        const data = await response.json();
        console.log(data); // 서버에서 받은 JSON 데이터 확인
        return data.exists; // 서버에서 받은 이메일 존재 여부 반환
      } else {
        // 서버 응답이 실패한 경우
        console.error('Failed to check email:', response.statusText);
        return false;
      }
    } catch (error) {
      // 네트워크 오류 등으로 인한 요청 실패
      console.log("catch");
      console.error('Error checking email:', error);
      return false;
    }
  };





  return (
    <>
      <div style={{ padding: '1rem' }}>
        <NavBar />
      </div>
      <div className={Styles.findPWPage}>
        <div className={Styles.findPWContainer}>
          <h2>비밀번호를 찾고자 하는 이메일을 입력하세요.</h2>

          <input
            className={Styles.authInput}
            type='text'
            placeholder='이메일을 입력하세요.'
            value={email}
            onChange={handleChange}
          />
          <br />
          <br />
          {warning && <Alert variant="danger">{warning}</Alert>}
          <Button
            className={Styles.authButton}
            variant="primary"
            onClick={handleOpenModal}
          >
            Next
          </Button>
          {showModal && (
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              animation={false}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>회원정보 찾기</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FindPW02 />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  취소
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button 
                variant="primary"
                onClick={() => window.location.href = `/Login/`}
                >확인</Button>
              </Modal.Footer>
            </Modal>
          )}

          <br />
          <br />
          <Link to='/findID'>
            <span style={{ textDecoration: 'none', color: 'gray', borderBottom: '2px solid', cursor: 'pointer' }}>아이디 찾으러 가기</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FindPwPage;

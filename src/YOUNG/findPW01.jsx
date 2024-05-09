
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import Styles from './findPW01.module.css'; 
import { Link } from "react-router-dom";
import FindPW02 from "./findPW02"

const FindPwPage = () => {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리

  const handleOpenModal = () => {
    setShowModal(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
  };


  return (
    <div className={Styles.findPWPage}>
      <div className={Styles.findPWContainer}> 
   
          <h2>비밀번호를 찾고자 하는 이메일을 입력하세요.</h2>

          <input
            className={Styles.authInput} 
            type='text'
            placeholder='이메일을 입력하세요.'
          />
          <br />
          <Button
            className={Styles.authButton} 
            variant="primary"
            onClick={handleOpenModal}
          >
            Next
          </Button>
         
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
              <FindPW02 />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}> {/* 모달 닫기 */}
              취소
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="primary">확인</Button> {/* 확인 버튼 */}
          </Modal.Footer>
          </Modal>
        
          <br />
          <br />
          <Link to='/findID'>
            <span className={Styles.spanLink} >아이디 찾으러 가기</span> {/* 클래스 이름 적용 */}
          </Link>
        </div>
      </div>

  );
};

export default FindPwPage;
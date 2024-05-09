import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import styles from './Agreement.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 임포트


const TermsAgreementForm = ({ show, onHide }) => {
  const [agreements, setAgreements] = useState({
    terms1: false,
    terms2: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAgreements({
      ...agreements,
      [name]: checked,
    });
  };

  const allAgreed = Object.values(agreements).every(Boolean);

  const handleAgreeAndClose = () => {
    if (allAgreed) {
      onHide();

    }
  };

  const clickCancelButton = () => {
    window.location.href = "/login";
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static" // 모달 외부 클릭 시 닫히지 않도록 설정
      keyboard={false} // ESC 키 등 키보드 입력으로 닫히지 않도록 설정
    >
      <Modal.Header closeButton onClick={clickCancelButton}>
        <Modal.Title>이용약관 동의</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTermsAgreement">
            <Form.Label>회원가입을 위해서 아래 이용 약관을 읽고 동의해 주세요.</Form.Label>
            <div className={styles.scrollable}> {/* 스크롤 가능하게 설정 */}
              <h3>개인정보 수집</h3>
              <p>제1조(목적)<br /> 이 약관은 JPlane이 운영하는 서비스를 이용함에 있어 회사와
                이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.<br />
                <br />제2조(정의)<br />
                "서비스"라 함은 구현되는 단말기와 상관없이 이용자가 이용할수 있는 제이플랜 및 제이플랜
                관련 제반 서비스를 의미한다.
                "이용자"라 함은 회사의 서비스에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.
                "회원"이라 함은 회사의 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말 합니다.
              </p>
            </div>
            <Form.Check
              type="checkbox"
              label="개인정보 수집에 동의합니다. (필수)"
              name="terms1"
              checked={agreements.terms1}
              onChange={handleCheckboxChange}
            />
          </Form.Group>

          <Form.Group controlId="formPrivacyPolicy">
            <div className={styles.scrollable}> {/* 스크롤 가능하게 설정 */}
              <h3>개인정보처리방침</h3>
              <p>
                1. 홈페이지 회원가입 및 관리<br />
                회원 가입의사 회원, 회원제 서비스 제공에 따른 본인 식별, 인증, 회원자격 유지, 관리, 제한적
                본인확인제 시행에 따른 본인 확인, 서비스 부정이용 방지, 각종 고지, 통지, 분쟁 조정을 위한 기록 보존 등을 목적으로 개인정보를 활용 합니다.<br />
                <br />2. 서비스 예약 또는 서비스의 이용 <br />
                서비스 제공, 바우처 및 이용권 발송, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 요금결제·정산 등을 목적으로 개인정보를 활용합니다.<br />
                콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성,
                지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 활용합니다.<br />
                서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산, 여행상품 예약, 컨텐츠 제공, 구매 및 요금 결제, 물품배송 또는 청구지 등 발송,
                금융거래 본인 인증 및 금융서비스 등을 위하여 개인정보를 활용합니다.<br />
                <br />3. 마케팅 및 광고에 활용
                신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 서비스의 유효성 확인,
                접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 활용합니다.
              </p>
            </div>
            <Form.Check
              type="checkbox"
              label="이용약관에 동의합니다. (필수)"
              name="terms2"
              checked={agreements.terms2}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>

        <Button variant="secondary" onClick={clickCancelButton}>취소</Button>
        <Button
          variant="primary"
          disabled={!allAgreed}
          onClick={handleAgreeAndClose}
        >
          동의 및 계속
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsAgreementForm;

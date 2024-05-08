import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './Agreement.module.css';

const TermsAgreementForm = () => {
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
  const router = useRouter();

  return (
    <Form>
      <Form.Group controlId="formTermsAgreement">
        <Form.Label>회원가입을 위해서 아래 이용 약관을 읽고 동의해 주세요.</Form.Label>
        <div className={styles.div}>
          <h3>개인정보 수집</h3>
          <br />
          <br />
          <p>
            제1조(목적)...
          </p>
          <br />
          <br />
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
        <div className="styles">
          <h3>개인정보처리방침</h3>
          <p>
            ...
          </p>
          <br />
          <br />
        </div>
        <Form.Check
          type="checkbox"
          label="이용약관에 동의합니다. (필수)"
          name="terms2"
          checked={agreements.terms2}
          onChange={handleCheckboxChange}
        />
      </Form.Group>

      <Button
        variant="primary"
        disabled={!allAgreed}
        onClick={() => {
          if (allAgreed) {
            router.push('/member/Signup/Signup01');
          }
        }}
      >
        동의 및 계속
      </Button>
    </Form>
  );
};

export default TermsAgreementForm;

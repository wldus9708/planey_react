import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './conjugation.scss';
import Dad from'./ttest';
Modal.setAppElement('#root');
const SurveyModal = ({ isOpen, onRequestClose }) => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [major_category, setPreference0] = useState('');
  const [middle_category, setPreference1] = useState('');
  const [minor_category, setPreference2] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 현재 시간에서 월을 가져오기
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요

    // Form 데이터와 현재 시간을 포함한 객체 생성
    const formData = {
      gender,
      age,
      major_category,
      middle_category,
      minor_category,
      month
    };

    // 폼 데이터와 현재 시간을 콘솔에 출력
    console.log(formData);

    // 폼 데이터와 현재 시간을 백엔드로 전송
    try {
      const response = await axios.post('http://localhost:8988/admin/aa', formData);
      console.log('Response from server:', response.data);
      // 요청이 성공하면 모달 닫기
      
      onRequestClose();      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    /*<Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Survey Modal"
      className="OModal"
    >*/
      <div className='dmodal'>
        <h2>설문지</h2>
        <form onSubmit={handleSubmit} className='surveyForm'>
          <div className='modal-content'>
          <div className="form-group">
              성별:
                <label>
                  <input
                    type="radio"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  남성
                </label>
                <label>
                  <input
                    type="radio"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  여성
                </label>
            </div>
          </div>
          <div className='modal-content'>
            <label>
              나이:
              <input
                className="form-control"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="0"
                max="100"
              />
            </label>
          </div>
          <div className='modal-content'>
            <label>
              국내/국외:
              <select
              className="form-control"
                value={major_category}
                onChange={(e) => {
                  setPreference0(e.target.value);
                  setPreference1(''); // Reset next preferences
                  setPreference2('');
                }}
                required
              >
                <option value="" disabled>Select your preference</option>
                <option value="0">국내</option>
                <option value="1">해외</option>
              </select>
            </label>
          </div>
          {major_category && (
            <div className='modal-content'>
              <label>
                국내/국외:
                <select
                className="form-control"
                  value={middle_category}
                  onChange={(e) => {
                    setPreference1(e.target.value);
                    setPreference2(''); // Reset next preference
                  }}
                  required
                >
                  <option value="" disabled>Select your preference</option>
                  <option value="0">서</option>
                  <option value="1">동</option>
                </select>
              </label>
            </div>
          )}
          {middle_category && (
            <div className='modal-content'>
              <label>
                관광지:
                <select
                className="form-control"
                  value={minor_category}
                  onChange={(e) => setPreference2(e.target.value)}
                  required
                >
                  <option value="" disabled>Select your preference</option>
                  <option value="0">국내</option>
                  <option value="1">해외</option>
                  <option value="2">국내</option>
                  <option value="3">해외</option>
                </select>
              </label>
            </div>
          )}
          {/*<Dad/>*/}
          <button variant="primary"type="submit" className='dd-button'>Submit</button>
        </form>
       
      </div>
   /* </Modal>*/
  );
};

export default SurveyModal;

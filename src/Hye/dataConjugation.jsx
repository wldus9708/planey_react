import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './conjugation.scss';
Modal.setAppElement('#root');

const SurveyModal = ({ isOpen, onRequestClose }) => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [mCategory, setMCategory] = useState('');
  const [mdCategory, setMdCategory] = useState('');
  const [majorCategory, setMajorCategory] = useState('');
  const [middleCategory, setMiddleCategory] = useState('');
  const [minorCategory, setMinorCategory] = useState('');

  const domesticOptions = [
    { value: '000', label: '강릉' },
    { value: '001', label: '경주' },
    { value: '002', label: '제주' },
    { value: '003', label: '독도' },
    { value: '004', label: '명동' },
    { value: '010', label: '부산' },
    { value: '011', label: '여수' },
    { value: '012', label: '인천' },
    { value: '013', label: '전주' }
  ];

  const foreignOptions = [
    { value: '100', label: '네덜란드' },
    { value: '101', label: '뉴질랜드' },
    { value: '102', label: '발리' },
    { value: '103', label: '베니스' },
    { value: '104', label: '보라카이' },
    { value: '110', label: '산토리니' },
    { value: '111', label: '스위스' },
    { value: '112', label: '아프가니스탄' },
    { value: '113', label: '이집트' },
    { value: '114', label: '이탈리아' },
    { value: '014', label: '인도' }
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 현재 시간에서 월을 가져오기
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요

    // Form 데이터와 현재 시간을 포함한 객체 생성
    const formData = {
      gender,
      age,
      majorCategory: majorCategory,
      middleCategory: middleCategory,
      minorCategory: minorCategory,
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
              value={mCategory}
              onChange={(e) => {
                setMCategory(e.target.value);
                setMajorCategory('');
                setMiddleCategory(''); // Reset next preference
                setMinorCategory('');
              }}
              required
            >
              <option value="" disabled>Select your preference</option>
              <option value="domestic">국내</option>
              <option value="foreign">해외</option>
            </select>
          </label>
        </div>
        {mCategory && (
          <div className='modal-content'>
            <label>
              {mCategory === 'domestic' ? '국내 지역:' : '해외 지역:'}
              {mCategory}
              <select
                className="form-control"
                value={mdCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  setMdCategory(value);
                  setMajorCategory(value.charAt(0));
                  setMiddleCategory(value.charAt(1));
                  setMinorCategory(value.charAt(2));
                }}
                required
              >
                <option value="" disabled>Select your preference</option>
                {mCategory === 'domestic' ? (
                  domesticOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))
                ) : (
                  foreignOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))
                )}
              </select>
            </label>
          </div>
        )}
        <button type="submit" className='dd-button'>Submit</button>
      </form>
    </div>
  );
};

export default SurveyModal;

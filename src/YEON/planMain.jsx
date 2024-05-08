import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import KakaoMap from './planContent/kakaoMap.js';

const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  height: 100vh;
`;


const StyledCol = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const StyledTabs = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  margin-left: 20px;
`;

const TabButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 20px;
  width: 150px;
  margin-bottom: 150px;
  transition: font-size 0.3s, font-weight 0.3s;
  
  &:hover {
    font-weight: bold;
    font-size: 20px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  height: 900px;
  border: 2px solid;
`;
const CreatePlanButton = styled.button`
  border: none;
  background-color: #71C9CE;
  color: #fff;
  font-size: 18px;
  padding: 10px 20px;
  margin-top: 30px;
  cursor: pointer;
`;
function FillExample() {
    const [activeKey, setActiveKey] = useState('city');

    const [markerPositions, setMarkerPositions] = useState([]);
    const markerPositions1 = [
        [33.4996, 126.5312] // 제주시 중심 부근 좌표
    ];

    const markerPositions2 = [
        [33.4996, 126.5312] // 제주시 중심 부근 좌표
    ];

    const [mapSize, setMapSize] = useState([1500, '70%']);

    const handleTabClick = (key) => {
        setActiveKey(key);
    };

    useEffect(() => {
        // 페이지가 처음 로드될 때 activeKey를 'city'로 설정
        setActiveKey('days');
    }, []); // 빈 배열을 전달하여 componentDidMount와 같은 동작을 함

    return (
        <>
            <Link to='/planMain'/>
            <StyledRow>
                <StyledCol>
                    <StyledTabs>
                        <TabButton onClick={() => handleTabClick('days')}>날짜확인</TabButton>
                        <TabButton onClick={() => handleTabClick('attraction')}>명소</TabButton>
                        <TabButton onClick={() => handleTabClick('hotel')}>숙소 </TabButton>
                        <CreatePlanButton onClick={() => console.log("일정 생성하기 버튼이 클릭되었습니다.")}>
                            일정 생성하기
                        </CreatePlanButton>
                    </StyledTabs>
                    <ContentWrapper>
                        {activeKey === 'days' && <KakaoMap markerPositions={markerPositions} size={mapSize} />}
                        {activeKey === 'attraction' && <div>명소 탭 내용</div>}
                        {activeKey === 'hotel' && <div>숙소 탭 내용</div>}
                    </ContentWrapper>
                </StyledCol>
            </StyledRow>
        </>
    );
}

export default FillExample;
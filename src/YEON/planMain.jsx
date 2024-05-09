import React, { useState } from 'react';
import Sidebar from './planSidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlanDay from './planContent/planDay';
import PlanAttraction from './planContent/planAttraction';
import styles from "./planMain.module.css";
import KakaoMap from './planContent/kakaoMap.js';

function AutoLayoutVariableExample() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true); // 토글 상태 추가

  const handleSidebarButtonClick = (component) => {
    setSelectedComponent(component);
  };

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const [markerPositions, setMarkerPositions] = useState([]);
  const [mapSize, setMapSize] = useState([800, 800]);
  return (
    <Container>
      <Row>
        <Col xs={2} lg={2} className={styles.sidebarcol}>
          <aside>
            <Sidebar onButtonClick={handleSidebarButtonClick} />
          </aside>
        </Col>
        <Col xs={4} lg={8}>
          {selectedComponent === 'component1' && <div>메인</div>}
          {selectedComponent === 'component2' && <PlanDay />}
          {selectedComponent === 'component3' && <PlanAttraction />}
        </Col>
        <Col xs={4} lg={3}>
          <KakaoMap markerPositions={markerPositions} size={mapSize} />
        </Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutVariableExample;
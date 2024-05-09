import React, { useState } from 'react';
import Sidebar from './planSidebar';
import PlanDay from './planContent/planDay';
import PlanAttraction from './planContent/planAttraction';
import styles from "./planMain.module.css";


const PlanMain = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleSidebarButtonClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className={styles.container}>
      <section class={styles.box}>
        <aside className={styles.boxsidebar}>
        <Sidebar onButtonClick={handleSidebarButtonClick} />
        </aside>
        <div className={styles.boxcontent}>
        {selectedComponent === 'component1' && <div>메인</div>}
        {selectedComponent === 'component2' && <PlanDay />}
        {selectedComponent === 'component3' && <PlanAttraction />}
        </div>
      </section>
    </div>
  );
};

export default PlanMain;

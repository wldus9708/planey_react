import React, { useState, useRef } from "react";
import { Tabs, Tab } from 'react-bootstrap'; // React Bootstrap의 탭 컴포넌트 사용
import styles from "./Search_field.module.css";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import { format } from 'date-fns';

function SearchField() {
   const [date, setDate] = useState([
      {
         startDate: new Date(),
         endDate: new Date(),
         key: 'selection'
      }
   ]);
   const [openDate, setOpenDate] = useState(false);
   const calendarRef = useRef(null);

   const handleCalendarClick = (e) => {
      if (calendarRef.current && calendarRef.current.contains(e.target)) {
         return;
      }
      setOpenDate(false);
   };

   const handleConfirm = () => {
      setOpenDate(false);
      console.log("Selected date range:", date);
   };

   return (
      <section className={styles.home}>
         <h6>여행갈 준비를 해보세요.</h6>
         <div className={`${styles.secContainer} container`} onClick={handleCalendarClick}>
      
            <Tabs
               defaultActiveKey="region"
               id="uncontrolled-tab-example"
               className="mb-3"
               fill>

               <Tab eventKey="region" title="step01.">
                  
                  <div className={styles.locationDiv}>
                     <label htmlFor="locationInput"></label>
                     <input
                        id="locationInput"
                        type="text"
                        placeholder="지역 입력"
                     />
                  </div>
               </Tab>
               <Tab
                  eventKey="date"
                  title="step02.">
                  <div className={`${styles.calendar} ${openDate ? styles.calendarOpen : ''}`} ref={calendarRef}>
                     <span onClick={() => setOpenDate(!openDate)}>
                        {`${format(date[0].startDate, "yyyy.MM.dd")} ~ ${format(date[0].endDate, "yyyy.MM.dd")}`}
                     </span>

                     {openDate && <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className={styles.date}
                     />}
                     {openDate && (
                        <div>
                           <button onClick={handleConfirm}>확인</button>
                        </div>
                     )}
                  </div>
                  </Tab>
                  <Tab
                      eventKey="count" 
                      title="step03.">
                  </Tab>
                  <button data-aos="zoom-in-up" className={styles.btn}>
                     Search
                  </button>
                  </Tabs>
               </div>
        
            </section>
    );
}

            export default SearchField;

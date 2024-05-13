import React, { useState, useRef } from "react";
import styles from "./Search_field.module.css";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import { format } from 'date-fns';

function SearchField() {
   // 달력 
   const [date, setDate] = useState([
      {
         startDate: new Date(),
         endDate: new Date(),
         key: 'selection'
      }
   ]);

   const [openDate, setOpenDate] = useState(false);
   const calendarRef = useRef(null); // 캘린더 참조

   const handleCalendarClick = (e) => {
      // 캘린더 영역을 클릭했을 때는 캘린더를 닫지 않음
      if (calendarRef.current && calendarRef.current.contains(e.target)) {
         return;
      }
      setOpenDate(false);
   };

   const handleConfirm = () => {
      setOpenDate(false);   
      // 선택한 날짜를 저장하거나 다른 작업 수행
      console.log("Selected date range:", date);
   };

//   // 인원수 조절 
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);
//   const [openModal, setOpenModal] = useState(false);

//   const handleOpenModal = () => {
//      setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//      setOpenModal(false);
//   };

//   const handleDecrement = (type) => {
//      if (type === 'adults' && adults > 0) {
//         setAdults(adults - 1);
//      } else if (type === 'children' && children > 0) {
//         setChildren(children - 1);
//      }
//   };

//   const handleIncrement = (type) => {
//      if (type === 'adults') {
//         setAdults(adults + 1);
//      } else if (type === 'children') {
//         setChildren(children + 1);
//      }
//   };


   return (
      <section className={styles.home}>
         <div className={`${styles.secContainer} container`} onClick={handleCalendarClick}>
            <div className={`${styles.homeCard} grid`}>
               <div className={styles.locationDiv}>
                  <label htmlFor="locationInput"></label>
                  <input
                     id="locationInput"
                     type="text"
                     placeholder="지역 입력"
                  />
               </div>

               <div className={`${styles.calendar} ${openDate ? styles.calendarOpen : ''}`} ref={calendarRef}>
                  <span onClick={() => setOpenDate(!openDate)}>
                     {`${format(date[0].startDate, "yyyy.MM.dd")} ~ ${format(date[0].endDate, "yyyy.MM.dd")}`} {/* 시작 날짜와 종료 날짜 표시 */}
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


                  <button data-aos="zoom-in-up" className={styles.btn}>
                     Search
                  </button>
               </div>
              

            </div>


         </div>
      </section>
   );
}

export default SearchField;

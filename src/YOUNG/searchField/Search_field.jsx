import React, { useState, useRef } from "react";
import { Tabs, Tab, Alert  } from 'react-bootstrap'; // React Bootstrap의 탭 컴포넌트 사용
import styles from "./Search_field.module.css";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-calendar/dist/Calendar.css';
import { format, isBefore } from 'date-fns';
import ko from 'date-fns/locale/ko'; // 'ko'를 가져옴



function SearchField() {
   const today = new Date();
   const [date, setDate] = useState([
      {
         startDate: today,
         endDate: today,
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

    // 경고 메시지 상태 추가
    const [showAlert, setShowAlert] = useState(false);

    const handleDateChange = (item) => {
      if (isBefore(item.selection.startDate, today)) { // 현재 날짜보다 이전인 경우
         setShowAlert(true); // 경고 표시
         return;
      } else {
         setShowAlert(false); // 경고 숨기기
      }
      setDate([item.selection]);
   };
    
 
    const handleAlertClose = () => setShowAlert(false); // 경고 닫기



   //  ===========================================
   // 검색어로 지역 찾기

   // 검색어 목록 (가정)
   const suggestions = ['강원', '제주', '강남', '송파구', '부산', '부천', '동대문', '인천', '홍대', '홍콩'];

   // 검색어와 입력값을 관리하는 상태
   const [input, setInput] = useState('');
   const [matchingSuggestions, setMatchingSuggestions] = useState([]);

   // 입력값이 변경될 때마다 관련 검색어를 찾아 상태를 업데이트하는 함수
   const handleInputChange = (e) => {
      const inputValue = e.target.value.toLowerCase();
      setInput(inputValue);
      if (inputValue) {
         const matching = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(inputValue)
         );
         setMatchingSuggestions(matching);
      } else {
         setMatchingSuggestions([]); // 입력값이 없을 때는 제안을 숨김
      }
   };

   // 검색어를 클릭하면 입력값을 해당 검색어로 설정하고 관련 검색어를 비움
   const handleSuggestionClick = (suggestion) => {
      setInput(suggestion);
      setMatchingSuggestions([]);
   };
   //  ===========================================
   // 인원수 조절 버튼 

   const [count, setCount] = useState(1);

   const increment = () => {
      if (count < 20) {
         setCount(count + 1);
      }
   };

   const decrement = () => {
      if (count > 1) {
         setCount(count - 1);
      }
   };





   return (
      <section className={styles.home}>

         <div
            className={`${styles.secContainer} container`}
            onClick={handleCalendarClick}>


            <Tabs
               defaultActiveKey="region"
               id="uncontrolled-tab-example"
               className="mb-3"
               fill>

               <Tab
                  eventKey="region"
                  title="지역선택"
                  className={styles.regionPicker} >
                  <div>
                     <input
                        type="text"
                        placeholder="&nbsp;&nbsp;&nbsp;&nbsp;지역을 검색 해보세요."
                        value={input}
                        onChange={handleInputChange}
                        className={styles.regionPicker}
                     />
                     <div className={styles.searchList}>
                        <ul>
                           {matchingSuggestions.map((suggestion, index) => (
                              <li
                                 key={index}
                                 onClick={() => handleSuggestionClick(suggestion)}
                              >
                                 {suggestion}
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>

               </Tab>
               {/* 날짜 고르기 */}
               <Tab
                  eventKey="date"
                  title="날짜 선택"
                  className={styles.calendarPicker}>
                  <div  locale={ko} className={`${styles.calendar} ${openDate ? styles.calendarOpen : ''}`} ref={calendarRef}>
                     <span
                       
                        className={styles.dateCheck}
                        onClick={() => setOpenDate(!openDate)}>
                        {`${format(date[0].startDate, "yyyy.MM.dd(EEE)", { locale: ko })} - ${format(date[0].endDate, "yyyy.MM.dd(EEE)", { locale: ko })}`}

                     </span>

                     {openDate && <DateRange
                        
                        editableDateInputs={false}
                        onChange={handleDateChange} // 변경된 핸들러로 교체
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className={`${styles.date} date-range-wrapper`} // 클래스 추가
                        locale={ko}
                        
                       
                     />}
                     {openDate && (
                        <div>
                           <button
                              className={styles.checkBtn}
                              onClick={handleConfirm}>확인</button>
                        </div>
                     )}
                     {/* 경고 표시 */}
                     <Alert 
                     show={showAlert} 
                     variant="danger" 
                     onClose={handleAlertClose} 
                     dismissible
                     className={styles.showAlert}>
                       당일 및 이전 날짜는 선택할 수 없습니다.
                     </Alert>
                  </div>
               </Tab>
               <Tab

                  eventKey="count" title="인원 선택">
                  <div
                  >
                     <label
                        className={styles.countTab}>소아 적용기준은 선택하신 상품 별로 상이할 수 있습니다. </label>
                     <br />
                     <label
                        className={styles.countTab}>성인 최대 20명 까지 가능합니다. </label>

                     <div>
                        <button
                           onClick={decrement}
                           className={styles.tabBtn}
                        >-</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={styles.tabSpan}>성인</span>
                        <span
                           className={styles.tabSpan}>{count}</span>
                        <button
                           onClick={increment}
                           className={styles.tabBtn}
                        >+</button>
                     </div>
                  </div>
               </Tab>

            </Tabs>
         </div>

      </section>
   );
}

export default SearchField;





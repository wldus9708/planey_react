import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { MenuItem, FormControl, InputLabel, Select, Box, Button, Typography, Menu } from '@mui/material';
import Form from 'react-bootstrap/Form';


const DatePickerComponent = () => {
  const [region, setRegion] = React.useState('');
  const handleChange = (event) => {
    setRegion(event.target.value);


  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },

    
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef(null);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [selectedValue, setSelectedValue] = useState(''); // 선택된 값을 저장하는 상태

  const incrementAdults = () => setAdults(adults + 1);
  const decrementAdults = () => {
    if (adults > 1) setAdults(adults - 1);
  };

  const incrementChildren = () => setChildren(children + 1);
  const decrementChildren = () => {
    if (children > 0) setChildren(children - 1);
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {
    // 선택된 값을 업데이트하고 메뉴를 닫음
    setSelectedValue(`Adults: ${adults}, Children: ${children}`);
    closeMenu();
  };

  return (
    <div className="homeCard grid">
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* 지역 선택 */}
          <FormControl>
            <InputLabel id="region-select-label">Region</InputLabel>
            <Select
              labelId="region-select-label"
              id="region-select"
              value={region}
              label="Region"
              onChange={handleChange}
            >
              <MenuItem value="Seoul">서울</MenuItem>
              <MenuItem value="Incheon">인천</MenuItem>
              <MenuItem value="Busan">부산</MenuItem>
              {/* 다른 지역 목록 */}
            </Select>
          </FormControl>

          {/* 날짜 선택 */}
          <div ref={dateRangeRef}>
            <Button onClick={handleInputClick}>날짜 선택</Button>
            {showDatePicker && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            )}
          </div>


        {/* 인원 선택 */}
        <div>
          <Button onClick={openMenu}>Select People</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            {/* 인원 선택 메뉴 아이템 */}
            {/* 확인 버튼 */}
          </Menu>
        </div>
        </Box>
      </div>
    </div>
  );
};
};

export default DatePickerComponent;

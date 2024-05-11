import React, { useState } from 'react';
import axios from 'axios';

const MapSearchComponent = () => {
  // 검색어 상태(state) 정의
  const [keyword, setKeyword] = useState('');
  // 검색 결과 상태 정의
  const [searchResult, setSearchResult] = useState('');

  // 검색어 입력 핸들러
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  // 주소 검색 함수
  const searchAddress = () => {
    // 카카오 맵 API 호출
    axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${keyword}`, {
      headers: {
        Authorization: 'KakaoAK 966a66380c2c908d0f3521c29573489b'
      }
    })
    .then((response) => {
      // 검색 결과 처리
      if (response.data.length > 0) {
        const address = response.data.documents[0].address_name;
        setSearchResult(address);
      } else {
        setSearchResult('검색 결과가 없습니다.');
      }
    })
    .catch((error) => {
      console.error('주소 검색 에러:', error);
      setSearchResult('검색 중 오류가 발생했습니다.');
    });
  };

  return (
    <div>
      <input type="text" value={keyword} onChange={handleKeywordChange} placeholder="주소 검색어 입력" />
      <button onClick={searchAddress}>검색</button>
      <div>
        <p>{searchResult}</p>
      </div>
    </div>
  );
};

export default MapSearchComponent;

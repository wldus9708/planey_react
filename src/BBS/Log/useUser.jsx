import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const useUser = () => {
  // 쿠키에서 'accessToken'을 가져옴
  const [cookies] = useCookies('accessToken');
  // 사용자 정보를 저장할 상태 변수
  const [user, setUser] = useState(null);

  useEffect(() => {
    // accessToken이 존재하는 경우
    if (cookies.accessToken) {
      // 사용자 정보를 가져오기 위해 API 호출
      axios.get('http://localhost:8988/member/detailPage', {
        headers: {
          Authorization: `${cookies.accessToken}`, // Authorization 헤더에 토큰 추가
        },
      })
        .then((response) => {
          // API 호출 성공 시 사용자 정보 상태 업데이트
          setUser(response.data);
        })
        .catch(error => {
          // API 호출 실패 시 에러 로그 출력
          // console.error('사용자 정보 가져오는 중 오류 발생:', error);
        });
    }
  }, [cookies]); // cookies가 변경될 때마다 useEffect 실행

  // 사용자 정보를 반환
  return user;
};

export default useUser;

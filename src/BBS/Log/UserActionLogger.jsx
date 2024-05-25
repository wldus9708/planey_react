import { useEffect } from 'react';
import { logUserAction } from './LogService';
import useUser from './useUser';

const UserActionLogger = () => {
    // useUser 훅을 사용하여 현재 사용자 정보를 가져옴
    const user = useUser();

    // 사용자 행동을 처리하는 함수
    const handleUserAction = (action) => {
        // 사용자가 없으면 함수 종료
        if (!user) return;

        // 현재 시간 생성
        const timestamp = new Date().toISOString();

        // 로그 데이터 생성
        const logData = {
            memberId: user.id, // 사용자 ID
            username: user.name, // 사용자 이름
            action: action, // 사용자 행동
            timestamp: timestamp, // 현재 시간
            ipAddress: '', // IP 주소는 서버에서 설정
            userAgent: navigator.userAgent, // 사용자 에이전트 정보
            details: `${user.name} 님이 ${timestamp}에 ${action}를 하셨습니다.`, // 추가 세부 사항
        };

        // 로그 데이터를 서버에 전송
        logUserAction(logData);
        // 로그 데이터를 콘솔에 출력
        console.log("UserActionLogger.jsx에서 출력 :", logData);
    };

    useEffect(() => {
        if (user) {
            // 클릭 이벤트 핸들러
            const handleClick = () => handleUserAction('CLICK');
            // 문서에 클릭 이벤트 리스너 추가
            document.addEventListener('click', handleClick);

            // 컴포넌트 언마운트 시 클릭 이벤트 리스너 제거
            return () => {
                document.removeEventListener('click', handleClick);
            };
        }
    }, [user]); // user가 변경될 때마다 useEffect 실행

    return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default UserActionLogger;

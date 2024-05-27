import { useEffect } from 'react';
import { logUserAction } from './LogService';
import useUser from './useUser';
import { useCookies } from 'react-cookie';

const UserActionLogger = () => {
    const user = useUser();
    const [cookies] = useCookies(['accessToken']);
    const token = cookies.accessToken;

    const handleUserAction = (action) => {
        if (!user) return;

        const timestamp = new Date().toISOString();
        const logData = {
            memberId: user.id,
            username: user.name,
            action: action,
            timestamp: timestamp,
            ipAddress: '',
            userAgent: navigator.userAgent,
            details: `${user.name} 님이 ${timestamp}에 ${action}를 하셨습니다.`,
        };

        console.log("로그 데이터:", logData); // 로그 데이터 출력
        logUserAction(logData, token);
        console.log("UserActionLogger.jsx에서 출력 :", logData);
    };

    useEffect(() => {
        if (user) {
            const handleClick = (event) => {
                const action = event.target.getAttribute('data-action') || 'CLICK';
                handleUserAction(action);
            };
            document.addEventListener('click', handleClick);

            return () => {
                document.removeEventListener('click', handleClick);
            };
        }
    }, [user]);

    return null;
};

export default UserActionLogger;

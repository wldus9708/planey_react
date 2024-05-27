// LogService.js
import axios from 'axios';

export const logUserAction = async (logData, token) => {
    try {
        const response = await axios.post('http://localhost:8988/logs/logBean', logData, {
            headers: {
                'Authorization': `Bearer ${token}`, // 인증 토큰 추가
                'Content-Type': 'application/json'
            }
        });
        console.log('로그 전송 성공:', response.data);
    } catch (error) {
        console.error('로그 전송 실패:', error);
    }
};

// LogService.js
export const logUserAction = async (logData) => {
    try {
        // 서버에 로그 데이터를 전송
        const response = await fetch('http://localhost:8988/logs/logBean', {
            method: 'POST', // HTTP POST 메서드 사용
            headers: {
                'Content-Type': 'application/json', // 요청 헤더에 JSON 형식 명시
            },
            body: JSON.stringify(logData), // 로그 데이터를 JSON 문자열로 변환하여 전송
        });
        // 서버 응답을 JSON 형식으로 반환
        return response.json();
    } catch (error) {
        // 에러 발생 시 콘솔에 에러 메시지 출력
        console.error('Error logging user action:', error);
    }
};
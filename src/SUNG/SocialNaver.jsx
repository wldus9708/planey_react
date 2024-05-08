
const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID; // 애플리케이션 등록 시 발급받은 Client ID 값 
const naverRedirectUri = process.env.REACT_APP_NAVER_REDIRECT_URI; // 애플리케이션을 등록 시 입력한 Callback URL 값으로 URL 인코딩을 적용한값
const naverState = process.env.REACT_APP_NAVER_STATE; // 애플리케이션을 등록 시 입력한 Callback URL 값으로 URL 인코딩을 적용한 값

// Get 방식으로 요청하는 URL
export const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${naverState}&redirect_uri=${naverRedirectUri}`;


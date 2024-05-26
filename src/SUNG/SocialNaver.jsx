const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
const naverRedirectUri = process.env.REACT_APP_NAVER_REDIRECT_URI;
const naverState = process.env.REACT_APP_NAVER_STATE;

export const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${naverState}&redirect_uri=${naverRedirectUri}`;

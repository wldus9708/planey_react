const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY;
export const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize?
client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const GOOGLE_AUTH_URL =
    `https://accounts.google.com/o/oauth2/auth`
    + `?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`
    + `&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}`
    + `&access_type=offline`
    + `&response_type=code`
    + `&scope=email profile`;
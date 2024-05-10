import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"

const GoogleLoginAPI = () => {

    const clientId = '672981026352-u28i38f8rujtiea8opiqnd6t0b5gv336.apps.googleusercontent.com'

    return(
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log(res);
                    }}
                    onError={(err) => {
                        console.log(err)
                    }}
                />
            </GoogleOAuthProvider>
        </>
    )
}

export default GoogleLoginAPI
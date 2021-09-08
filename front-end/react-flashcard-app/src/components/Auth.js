import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router';

const Login = () => {

    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const formSwitch = () => {
        setIsSignup(!isSignup);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log('Google login was unsuccesful.');
    }

    return(
        <div>
            { isSignup ? <h2>Sign up</h2> : <h2>Sign in</h2> }
            <form>
                { isSignup && (
                    <>
                    <label>First name</label>
                    <input
                        required
                    ></input>
                    <label>Last name</label>
                    <input
                        required
                    ></input>
                    </>
                )}
                <label>Email</label>
                <input
                    required
                ></input>
                <label>Password</label>
                <input
                    required
                ></input>
                { isSignup && (
                    <>
                    <label>Repeat password</label>
                    <input
                        required
                    ></input>
                    </>
                )}
                { isSignup? <button>Sign up</button> : <button>Sign in</button> }
                <GoogleLogin 
                    clientId="432327020955-4dch0afndf1oo9nljla6kdcbd46dijet.apps.googleusercontent.com"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
            </form>
            { isSignup? <><span>Already have an account? </span><a onClick={formSwitch}>Sign in</a></> 
                : <><a>Forgot password?</a><span>Don't have an account? </span><a onClick={formSwitch}>Sign up</a></>}
        </div>
    )
}

export default Login;

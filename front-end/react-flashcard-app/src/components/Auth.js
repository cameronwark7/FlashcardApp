import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router';
import { signin, signup } from '../actions/auth.js';
import { Button } from '@chakra-ui/react';

const Login = () => {

    const [isSignup, setIsSignup] = useState(false);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');


    const dispatch = useDispatch();
    const history = useHistory();

    const formSwitch = () => {
        setIsSignup(!isSignup);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            firstName,
            lastName,
            email,
            password,
            repeatPassword
        }
        console.log(formData);
        
        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
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
            <form onSubmit={handleSubmit}>
                { isSignup && (
                    <>
                    <label>First name</label>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    ></input>
                    <br/>

                    <label>Last name</label>
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    ></input>
                    <br/>
                    </>
                )}
                <label>Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></input>
                <br/>

                <label>Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>
                <br/>

                { isSignup && (
                    <>
                    <label>Repeat password</label>
                    <input
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    ></input>
                    <br/>
                    </>
                )}

                <Button type='submit'>
                    { isSignup ? 'Sign up' : 'Sign in' }
                </Button>
                <br/>

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

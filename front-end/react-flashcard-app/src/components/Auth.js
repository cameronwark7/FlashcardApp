import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router';
import { signin, signup } from '../actions/auth.js';
import { Button, Input, Heading, Text } from '@chakra-ui/react';

const Login = () => {

    const [isSignup, setIsSignup] = useState(false);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');
    // const [firstNameError, setFirstNameError] = useState('');
    // const [lastNameError, setLastNameError] = useState('');
    // const [emailError, setEmailError] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    // const [repeatPasswordError, setRepeatPasswordError] = useState('');


    const dispatch = useDispatch();
    const history = useHistory();

    const formSwitch = () => {
        setLoginError('');
        setSignupError('');
        setIsSignup(!isSignup);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError('');
        setSignupError('');

        const lowercaseEmail = email.toLocaleLowerCase();
        console.log(lowercaseEmail)
        const formData = {
            firstName,
            lastName,
            email: lowercaseEmail,
            password,
            repeatPassword
        }
        console.log(formData);
        if (isSignup) {
            dispatch(signup(formData, history)).then((res) => {
                console.log(res);
                if (res != undefined && res.status != 200) {
                    setLoginError(res.data.message);
                }
            });
        } else {
            dispatch(signin(formData, history)).then((res) => {
                console.log(res);
                if (res != undefined && res.status != 200) {
                    setSignupError(res.data.message);
                }
            });
        }
    }

    const googleLoginSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleSignupSuccess = async (res) => {
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
            { isSignup ? <Heading size='md'>Sign up</Heading> : <Heading size='md'>Log in</Heading> }
            <form onSubmit={handleSubmit}>
                { isSignup && (
                    <>
                    <label>First name</label>
                    <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    ></Input>
                    <br/>

                    <label>Last name</label>
                    <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    ></Input>
                    <br/>
                    </>
                )}
                <label>Email</label>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></Input>
                {/* { emailError && <div>{emailError}</div>} */}
                {/* <br/> */}

                <label>Password</label>
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></Input>
                <br/>

                { isSignup && (
                    <>
                    <label>Repeat password</label>
                    <Input
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    ></Input>
                    <br/>
                    </>
                )}

                {signupError && <Text color='red'>{signupError}</Text>}
                {loginError && <Text color='red'>{loginError}</Text>}
                <Button type='submit'>
                    { isSignup ? 'Sign up' : 'Login' }
                </Button>
                <br/>

                {/* { isSignup ? 
                <GoogleLogin 
                    clientId="432327020955-4dch0afndf1oo9nljla6kdcbd46dijet.apps.googleusercontent.com"
                    buttonText='Sign up with Google'
                    onSuccess={googleSignupSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    />
                :
                <GoogleLogin 
                    clientId="432327020955-4dch0afndf1oo9nljla6kdcbd46dijet.apps.googleusercontent.com"
                    buttonText='Log in with Google'
                    onSuccess={googleLoginSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                } */}
            </form>
            { isSignup? <><span>Already have an account? </span><a onClick={formSwitch}>Login</a></> 
                : <><a>Forgot password?</a><span>Don't have an account? </span><a onClick={formSwitch}>Sign up</a></>}
        </div>
    )
}

export default Login;

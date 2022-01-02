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
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');


    const dispatch = useDispatch();
    const history = useHistory();

    const formSwitch = () => {
        setLoginError('');
        setSignupError('');
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');
        setRepeatPasswordError('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setIsSignup(!isSignup);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError('');
        setSignupError('');

        const isValid = validate();
        if (isValid) {
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
    }

    const validate = () => {
        setLoginError('');
        setSignupError('');
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');
        setRepeatPasswordError('');

        let validationState = true;
        
        if (!email.includes('@')) {
            setEmailError('Invalid email address.');
            validationState = false;
        }
        if (password.length > 30 || password.length < 5) {
            setPasswordError('Password must be between 5 and 30 characters.');
            validationState = false;
        }

        if (isSignup) {
            if (firstName.length > 20 || firstName.length == 0) {
                setFirstNameError('First name must be between 1 and 20 characters.');
                validationState = false;
            }
            if (lastName.length > 20 || lastName.length == 0) {
                setLastNameError('Last name must be between 1 and 20 characters.');
                validationState = false;
            }
            if (repeatPassword.length > 30 || repeatPassword.length < 5) {
                setRepeatPasswordError('Password must be between 5 and 30 characters');
                validationState = false;
            }
            if (repeatPassword != password) {
                setRepeatPasswordError('Passwords do not match');
                validationState = false;
            }
        }

        return validationState;
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
                    ></Input>
                    {firstNameError && <Text color='red'>{firstNameError}</Text>}
                    <br/>

                    <label>Last name</label>
                    <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    ></Input>
                    {lastNameError && <Text color='red'>{lastNameError}</Text>}
                    <br/>
                    </>
                )}
                <label>Email</label>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Input>
                {emailError && <Text color='red'>{emailError}</Text>}
                <br/>

                <label>Password</label>
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Input>
                {passwordError && <Text color='red'>{passwordError}</Text>}
                <br/>

                { isSignup && (
                    <>
                    <label>Repeat password</label>
                    <Input
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    ></Input>
                    {repeatPasswordError && <Text color='red'>{repeatPasswordError}</Text>}
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

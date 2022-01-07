import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { signin, signup } from '../actions/auth.js';
import { Center, Box, Button, Input, Heading, Text, VStack } from '@chakra-ui/react';

const Login = (props) => {
    const [formState, setFormState] = useState('login');

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
    const { state } = useParams();

    useEffect(() => {
        resetFields();
        resetErrors();
        console.log(state)
        if (state == 'login') {
            setFormState('login');
        } else if (state == 'signup') {
            setFormState('signup');
        }
    }, [state]);

    const loginFormSwitch = () => {
        resetFields();
        resetErrors();
        history.push('/auth/login')
    }

    const signupFormSwitch = () => {
        resetFields();
        resetErrors();
        history.push('/auth/signup')
    }

    const resetFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    const resetErrors = () => {
        setLoginError('');
        setSignupError('');
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');
        setRepeatPasswordError('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        resetErrors();

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
            if (formState == 'signup') {
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
        // resetErrors();

        let validationState = true;
        
        if (!validateEmail(email)) {
            setEmailError('Invalid email address.');
            validationState = false;
        }
        if (password.length > 30 || password.length < 5) {
            setPasswordError('Password must be between 5 and 30 characters.');
            validationState = false;
        }

        if (formState == 'signup') {
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

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
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
        <VStack marginY={'10px'}>
            { formState == 'signup' ? <Heading size='md'>Sign up</Heading> : <Heading size='md'>Log in</Heading> }
            <Box width={'30%'}>
            
            <form onSubmit={handleSubmit}>
                { formState == 'signup' && (
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
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                ></Input>
                {passwordError && <Text color='red'>{passwordError}</Text>}
                <br/>

                { formState == 'signup' && (
                    <>
                    <label>Repeat password</label>
                    <Input
                        value={repeatPassword}
                        type='password'
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    ></Input>
                    {repeatPasswordError && <Text color='red'>{repeatPasswordError}</Text>}
                    <br/>
                    </>
                )}

                {signupError && <Text color='red'>{signupError}</Text>}
                {loginError && <Text color='red'>{loginError}</Text>}
                <Center>
                    <Button type='submit' marginY={'10px'}>
                        { formState == 'signup' ? 'Sign up' : 'Login' }
                    </Button>
                </Center>

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
            </Box>
            <Box>
                { formState == 'signup'? <><span>Already have an account? </span><a onClick={loginFormSwitch} className='formSwitch'>Login</a></> 
                    : <>
                    {/* <a>Forgot password? </a> */}
                    <span>Don't have an account? </span><a onClick={signupFormSwitch} className='formSwitch'>Sign up</a></>}
            </Box>
        </VStack>
    )
}

export default Login;

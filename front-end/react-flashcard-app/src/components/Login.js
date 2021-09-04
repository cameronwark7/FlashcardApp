import { useState } from 'react';

const Login = () => {

    const [isSignup, setIsSignup] = useState(false);

    const formSwitch = () => {
        setIsSignup(!isSignup);
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
            </form>
            { isSignup? <><span>Already have an account? </span><a onClick={formSwitch}>Sign in</a></> 
                : <><a>Forgot password?</a><span>Don't have an account? </span><a onClick={formSwitch}>Sign up</a></>}
        </div>
    )
}

export default Login;

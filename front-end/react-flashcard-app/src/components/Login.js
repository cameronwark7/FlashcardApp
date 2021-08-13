import { Link } from 'react-router-dom';

const Login = () => {
    return(
        <div>
            <h2>Sign in</h2>
            <form>
                <label>Email</label>
                <input
                    required
                ></input>
                <label>Password</label>
                <input
                    required
                ></input>
            </form>
            <a>Forgot password?</a>
            <span>Don't have an account? </span><Link to="/register">Sign up</Link>
        </div>
    )
}

export default Login;

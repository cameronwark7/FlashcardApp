import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

const Navbar = () => {

    // 'profile' set in auth.js reducer.
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }

    return(
        <div>
            <Link to="/">Home</Link>
            {user ? (
                <>
                <Link to="/add-card">Add Cards</Link>
                <Link to="/study">Study</Link>
                <Link to="/decks">My Decks</Link>
                <button onClick={logout}>Logout</button>
                </>
            ) : (
                <Link to="/login">Sign in</Link>
            )}
        </div>
    )
}

export default Navbar;

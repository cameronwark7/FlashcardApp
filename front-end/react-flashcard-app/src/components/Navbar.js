import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Button, ButtonGroup } from '@chakra-ui/react';

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
            {user ? (
                <>
                <ButtonGroup>
                    <Link to="/">
                        <Button>Home</Button>
                    </Link>
                    <Link to="/add-card">
                        <Button>Add Cards</Button>
                    </Link>
                    <Link to="/study">
                        <Button>Study</Button>
                    </Link>
                    <Link to="/decks">
                        <Button>My Decks</Button>
                    </Link>
                    <Button onClick={logout}>Logout</Button>
                </ButtonGroup>
                </>
            ) : (
                <>
                <ButtonGroup>
                    <Link to="/">
                        <Button>Home</Button>
                    </Link>
                    <Link to="/login">
                        <Button>Sign in</Button>
                    </Link>
                </ButtonGroup>
                </>
            )}
        </div>
    )
}

export default Navbar;

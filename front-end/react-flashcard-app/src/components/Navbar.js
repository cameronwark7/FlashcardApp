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
                    <Button>
                        <Link to="/">Home</Link>
                    </Button>
                    <Button>
                        <Link to="/add-card">Add Cards</Link>
                    </Button>
                    <Button>
                        <Link to="/study">Study</Link>
                    </Button>
                    <Button>
                        <Link to="/decks">My Decks</Link>
                    </Button>
                    <Button onClick={logout}>Logout</Button>
                </ButtonGroup>
                {/* <button onClick={logout}>Logout</button> */}
                </>
            ) : (
                <>
                <ButtonGroup>
                    <Button><Link to="/">Home</Link></Button>
                    <Button><Link to="/login">Sign in</Link></Button>
                </ButtonGroup>
                </>
            )}
        </div>
    )
}

export default Navbar;

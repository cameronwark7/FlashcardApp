import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Button, Text, ButtonGroup, Spacer, Flex, Center } from '@chakra-ui/react';
import decode from 'jwt-decode';

const Navbar = () => {

    // 'profile' set in auth.js reducer.
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const title = 'Study Boost';

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            // logout if token expired
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

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
                <Flex borderBottom='1px' borderColor='gray.200' padding={'4px'}>
                <Center>
                    <Link to="/decks">
                        <span className='headerTitle'>{title}</span>
                    </Link>
                </Center>
                <ButtonGroup>
                    <Link to="/add-card">
                        <Button>Add Cards</Button>
                    </Link>
                    <Link to="/study">
                        <Button>Study</Button>
                    </Link>
                    <Link to="/decks">
                        <Button>My Decks</Button>
                    </Link>
                </ButtonGroup>
                <Spacer />
                <Button onClick={logout} marginX={'7px'}>Logout</Button>
                </Flex>
            ) : (
                <Flex borderBottom='1px' borderColor='gray.200' padding={'4px'}>
                    <ButtonGroup size='sm'>
                        <Center>
                            <Link to="/">
                                {/* <Text size='xl'>App Name</Text> */}
                                <span className='headerTitle'>{title}</span>
                            </Link>
                        </Center>
                    </ButtonGroup>
                    <Spacer />
                    <Link to="/auth/login"><Button marginX={'7px'}>Login</Button></Link>
                </Flex>
            )}
        </div>
    )
}

export default Navbar;

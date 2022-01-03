import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Button, Text, ButtonGroup, Spacer, Flex, Center } from '@chakra-ui/react';

const Navbar = () => {

    // 'profile' set in auth.js reducer.
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const title = 'Flashcard App';

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
                <Flex borderBottom='1px' borderColor='gray.200' padding={'4px'}>
                <Center>
                    <Link to="/">
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
                    <Link to="/login"><Button marginX={'7px'}>Login</Button></Link>
                </Flex>
            )}
        </div>
    )
}

export default Navbar;

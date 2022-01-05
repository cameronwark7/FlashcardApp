import React, { useEffect } from 'react';
import { getDecks } from '../actions/decks';
import { useDispatch } from 'react-redux';
import { Text, Center, Button, VStack, Spacer } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Box
  } from '@chakra-ui/react';

const Homepage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        if (user != null) {
        const email = user.result.email;
        const obj = {
            email
        }
        dispatch(getDecks(obj));
        }
    }, [dispatch]);

    const signupRedirect = () => {
        history.push('/auth/signup')
    }

    return(
        <Center>
            <VStack>
                <Text fontSize='2xl' marginY={'30px'}>Accelerate your learning with Flashcard App!</Text>
                <Center>
                    <VStack>
                        <Text fontSize='xl'>Create flashcards</Text>
                        <Text fontSize='xl'>Organize cards into unique decks</Text>
                        <Text fontSize='xl'>Manage and study collections easily</Text>
                    </VStack>
                </Center>
                <Spacer />
                <Button onClick={signupRedirect} className='homepageButton'>Create an Account</Button>
            </VStack>
        </Center>
    )
}

export default Homepage;

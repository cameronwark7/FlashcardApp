import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@chakra-ui/react';
import DeckListBox from './DeckListBox';
import { Center, Stack, HStack, VStack, StackDivider, ButtonGroup } from '@chakra-ui/react';
import * as api from '../api/index';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDecks } from '../actions/decks';

const Decks = () => {
    // references /reducers/index.js
    const decks = useSelector((state) => state.decks);
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        if (user != null) {
        const email = user.result.email;
        const obj = {
            email
        }
        dispatch(getDecks(obj));
        }
    }, [dispatch])

    // redirect to create deck component
    const history = useHistory();
    const createDeck = () => {
        history.push('/create-deck');
    }

    return(
        <Center marginX='10px'>
            <VStack width='80%'  marginY='10px'>
                <VStack
                width='80%'
                divider={<StackDivider borderColor='gray.200' />}
                spacing={1}
                borderRadius='md'
                align='stretch' // moves items from middle of screen to the left
                >
                    { decks && decks.map((deck) => {
                        return <DeckListBox deck={deck} />
                    }) }
                    { decks.length == 0 && <Center><p>No decks created</p></Center>}
                </VStack>
                <Button onClick={createDeck}>Create Deck</Button>
            </VStack>
        </Center>
    )
}

export default Decks;
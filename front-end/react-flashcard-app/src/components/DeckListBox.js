import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import { Center, Square, Circle, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react'
import * as api from '../api/index';

const DeckListBox = (props) => {

    const history = useHistory();

    const redirect = (deck) => {
        history.push(`/decks/${deck}`)
    }

    const deleteDeck = (deckName) => {
        const profile = localStorage.getItem('profile');
        const obj = {
            deckName,
            email: JSON.parse(profile).result.email
        }
        api.deleteDeck(obj);
    }

    return(
        <Flex>
            <Center
            onClick={() => redirect(props.deck.name)}
            >{props.deck.name}</Center>
            <Button
            onClick={() => deleteDeck(props.deck.name)}
            >Delete</Button>
        </Flex>
    )
}

export default DeckListBox;

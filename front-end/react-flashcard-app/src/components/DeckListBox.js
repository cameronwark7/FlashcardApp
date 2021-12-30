import React, { useEffect } from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import { Center, Square, Circle, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react'
import * as api from '../api/index';
import { useState } from 'react';

const DeckListBox = (props) => {

    const history = useHistory();

    const redirect = (deck) => {
        history.push(`/decks/${deck}`)
    }

    const deleteDeck = async (deckName) => {
        const profile = localStorage.getItem('profile');
        const obj = {
            deckName,
            email: JSON.parse(profile).result.email
        }
        const res = await api.deleteDeck(obj);
        window.location.reload();
    }

    const renameDeck = (deck) => {
        history.push(`/decks/rename/${deck}`);
    }

    return(
        <Flex>
            <Center
            onClick={() => redirect(props.deck.name)}
            >{props.deck.name}</Center>
            <Button
            onClick={() => renameDeck(props.deck.name)}
            >Rename</Button>
            <Button
            onClick={() => deleteDeck(props.deck.name)}
            >Delete</Button>
        </Flex>
    )
}

export default DeckListBox;

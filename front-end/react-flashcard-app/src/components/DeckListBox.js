import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import { Center, Square, Circle } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const DeckListBox = (props) => {

    const history = useHistory();

    const redirect = (deck) => {
        history.push(`/decks/${deck}`)
    }

    return(
        <Flex>
            <Center
            onClick={() => redirect(props.deck.name)}
            >{props.deck.name}</Center>
        </Flex>
    )
}

export default DeckListBox;

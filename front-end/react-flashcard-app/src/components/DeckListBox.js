import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import { Center, Square, Circle } from '@chakra-ui/react';

const DeckListBox = (props) => {
    return(
        <Flex>
            <Center>{props.deck.name}</Center>
        </Flex>
    )
}

export default DeckListBox;

import React from 'react';
import { useParams } from 'react-router-dom';
import { Center, Stack, HStack, VStack, StackDivider, Box, Button, Textarea, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const DeckView = () => {

    const { deckName } = useParams();
    const decks = useSelector((state) => state.decks);
    const [selectedDeck, setSelectedDeck] = useState(false);

    let selectedIndex = 0;
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    useEffect(() => {
        if (decks.length != 0) {
            const x = decks.filter(obj => {
                return obj.name == deckName;
            });
            setSelectedDeck(x[0].cards);
        }
    }, [decks]);

    const setForm = (card, index) => {
        selectedIndex = index;
        setFront(card.front);
        setBack(card.back);
    }

    return(
        <div>
            <p>{deckName}</p>
            <HStack>
                <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={3}
                w={'60%'}
                align='stretch'
                >
                    { selectedDeck && selectedDeck.map((card, index) => {
                            return <div onClick={() => setForm(card, index)}>{card.front}</div>
                    }) }
                    { selectedDeck.length == 0 && <Center>No cards in deck</Center> }
                </VStack>
                <Box
                w={'40%'}
                >
                    <Text>Front:</Text>
                    <Textarea
                    value={front}
                    placeholder='Front'
                    onChange={(e) => setFront(e.target.value)}
                    ></Textarea>

                    <Text>Back:</Text>
                    <Textarea
                    value={back}
                    placeholder='Back'
                    onChange={(e) => setBack(e.target.value)}
                    ></Textarea>
                    <Button>Save</Button>
                </Box>
            </HStack>
        </div>
    )
}

export default DeckView;

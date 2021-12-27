import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack, HStack, VStack, StackDivider, Box, Button, Textarea, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const DeckView = () => {

    const { deckName } = useParams();
    const decks = useSelector((state) => state.decks);
    const [selectedDeck, setSelectedDeck] = useState(false);

    console.log(selectedDeck)

    useEffect(() => {
        if (decks.length != 0) {
            const x = decks.filter(obj => {
                return obj.name == deckName;
            });
            setSelectedDeck(x[0].cards);
        }
    }, [decks]);

    return(
        <div>
            <p>{deckName}</p>
            <HStack>
                <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={3}
                w={'60%'}
                align='stretch' // moves items from middle of screen to the left
                >
                    { selectedDeck && selectedDeck.map((deck) => {
                            return <div>{deck.front}</div>
                    }) }
                    { selectedDeck.length == 0 && <p>No decks</p> }
                </VStack>
                <Box
                w={'40%'}
                >
                    <Text>Front:</Text>
                    <Textarea
                    value={'front'}
                    placeholder='Front'
                    ></Textarea>

                    <Text>Back:</Text>
                    <Textarea
                    value={'back'}
                    placeholder='Back'
                    ></Textarea>
                    <Button>Save</Button>
                </Box>
            </HStack>
        </div>
    )
}

export default DeckView;

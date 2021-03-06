import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Stack, VStack, Center, Text, Box } from '@chakra-ui/react';
import { StackDivider, Wrap, WrapItem } from '@chakra-ui/react'

const StudyDeck = () => {

    const { deckName } = useParams();
    const decks = useSelector((state) => state.decks);
    const [selectedDeck, setSelectedDeck] = useState(false);
    const [selectedDeckRandom, setSelectedDeckRandom] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [deckArrayIndex, setDeckArrayIndex] = useState(0);

    useEffect(() => {
        if (decks.length != 0) {
            const x = decks.filter(obj => {
                return obj.name == deckName;
            });
            setSelectedDeck(x[0].cards);
            setRandomizedDeck(x[0].cards);
            // console.log(x[0].cards);
        }
    }, [decks]);

    const setRandomizedDeck = (array) => {
        let currentIndex = array.length, randomIndex;

        while (currentIndex != 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        // set useState variable
        setSelectedDeckRandom(array);
    }

    const showButtonClick = () => {
        setShowCard(true);
    }

    const againButtonClick = () => {
        setShowCard(false);

        // Generate a new index that is not the same as the previous index
        let randomIndex = null;
        do {
            randomIndex = Math.floor(Math.random() * selectedDeckRandom.length);
            if (selectedDeckRandom.length == 1) {
                break;
            }
        } while (randomIndex == deckArrayIndex);
        setDeckArrayIndex(randomIndex);
    }

    const goodButtonClick = () => {
        setShowCard(false);

        // make a new array and delete the current index
        let arr = selectedDeckRandom.slice();
        arr.splice(deckArrayIndex, 1);

        // get the max index of the array, and randomly choose an integer between 0 and that index.
        const randomIndex = Math.floor(Math.random() * arr.length);
        setDeckArrayIndex(randomIndex);

        setSelectedDeckRandom(arr);
    }

    const rebuildDeck = () => {
        const x = decks.filter(obj => {
            return obj.name == deckName;
        });
        setRandomizedDeck(x[0].cards);
    }

    return(
        <Center>
            <VStack 
            marginY={'10px'} 
            width={'40%'}
            wrap={'true'}
            border='1px' borderColor='gray.200' borderRadius={'md'}
            padding={'20px'}
            >
                <Center h='150px' w={'100%'}>
                    {selectedDeckRandom.length > 0 && <div className='studyDiv'>{selectedDeckRandom[deckArrayIndex]?.front}</div>}
                    {!selectedDeckRandom.length > 0 && <Center><Text fontSize={'xl'}>Deck complete!</Text></Center>}
                </Center>
                <Center h='150px' w={'100%'}>
                    {showCard && <div className='studyDiv'>{selectedDeckRandom[deckArrayIndex]?.back}</div>}
                </Center>
                
                <Box>
                    {selectedDeckRandom.length > 0 ? 
                    <>
                        {showCard ? <ButtonGroup><Button onClick={againButtonClick}>Again</Button><Button onClick={goodButtonClick}>Good</Button></ButtonGroup>
                            : <Button onClick={showButtonClick}>Show</Button> }
                    </>
                    : <Button onClick={rebuildDeck}>Rebuild Deck</Button>}
                </Box>
            </VStack> 
        </Center>
    )
}

export default StudyDeck;

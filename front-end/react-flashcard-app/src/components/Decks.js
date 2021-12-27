import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@chakra-ui/react';
import DeckListBox from './DeckListBox';
import { Stack, HStack, VStack, StackDivider } from '@chakra-ui/react';

const Decks = () => {
    // references /reducers/index.js
    const decks = useSelector((state) => state.decks);

    // redirect to create deck component
    const history = useHistory();
    const createDeck = () => {
        history.push('/create-deck');
    }

    return(
        <div>
            <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={3}
            align='stretch' // moves items from middle of screen to the left
            >
                { decks && decks.map((deck) => {
                    return <DeckListBox deck={deck} />
                }) }
                { decks.length == 0 && <p>No decks</p>}
            </VStack>
            <Button onClick={createDeck}>Create Deck</Button>
        </div>
    )
}

export default Decks;
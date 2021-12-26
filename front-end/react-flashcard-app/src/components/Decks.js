import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@chakra-ui/react';

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
            <div>
                { decks && decks.map((deck) => {
                    return <p>{deck.name}</p>
                }) }
                { decks.length == 0 && <p>No decks</p>}
            </div>
            <Button onClick={createDeck}>Create Deck</Button>
        </div>
    )
}

export default Decks;
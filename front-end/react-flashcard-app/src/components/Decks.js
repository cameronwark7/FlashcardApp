import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Decks = () => {
    // 'state.cards' references /reducers/index.js
    const decks = useSelector((state) => state.decks);
    console.log(decks);

    const history = useHistory();
    // redirect to create deck component
    const createDeck = () => {
        history.push('/create-deck');
    }

    return(
        <div>
            <h1>Decks</h1>
            {/* display a list of deck components with the .map() method and pass their names with props */}
            <div>
                {/* {isPending && <p>Loading...</p>} */}
                {decks && <p>{decks}</p>}
            </div>
            <button onClick={createDeck}>Create Deck</button>
        </div>
    )
}

export default Decks;
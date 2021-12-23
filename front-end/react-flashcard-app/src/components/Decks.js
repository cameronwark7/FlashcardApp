import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Decks = () => {
    // references /reducers/index.js
    const decks = useSelector((state) => state.decks);
    console.log(decks);

    // redirect to create deck component
    const history = useHistory();
    const createDeck = () => {
        history.push('/create-deck');
    }

    return(
        <div>
            <h1>Decks</h1>
            {/* display a list of deck components with the .map() method and pass their names with props */}
            <div>
                {/* {isPending && <p>Loading...</p>} */}
                {decks && <p>{JSON.stringify(decks)}</p>}
            </div>
            <button onClick={createDeck}>Create Deck</button>
        </div>
    )
}

export default Decks;
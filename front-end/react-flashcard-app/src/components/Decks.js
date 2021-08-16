import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Decks = () => {

    const history = useHistory();

    const displayDecks = () => {
        fetch('http://localhost:3001/api/v1/unique-decks')
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                console.log(json);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // retrieve unique decks on first render
    useEffect(() => {
        displayDecks();
    }, []);

    // redirect to create deck component
    const createDeck = () => {
        history.push('/create-deck');
    }

    return(
        <div>
            <h1>Decks</h1>
            <button onClick={createDeck}>Create Deck</button>
        </div>
    )
}

export default Decks;
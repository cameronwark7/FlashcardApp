import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Decks = () => {

    const history = useHistory();
    const [decks, setDecks] = useState(null);
    const [isPending, setPending] = useState(true)

    const displayDecks = () => {
        fetch('http://localhost:3001/api/v1/unique-decks')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setPending(false);
                setDecks(data);
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
            {/* display a list of deck components with the .map() method and pass their names with props */}
            <div>
                {isPending && <p>Loading...</p>}
                {decks && <p>{decks}</p>}
            </div>
            <button onClick={createDeck}>Create Deck</button>
        </div>
    )
}

export default Decks;
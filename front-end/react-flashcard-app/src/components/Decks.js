import { useEffect } from "react";

const Decks = () => {

    // retrieve unique decks on first render
    useEffect(() => {
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
    }, []);

    return(
        <div>
            <h1>Decks</h1>
            <button>Add Deck</button>
        </div>
    )
}

export default Decks;
import { useState } from "react";
import { useSelector } from "react-redux";

const AddCard = () => {

    const [deck, setDeck] = useState('default');
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const decks = useSelector((state) => state.decks);
    console.log(decks);

    const handleSubmit = (e) => {
        e.preventDefault();
        const card = {deck, front, back};
        console.log(card);

        // fetch('http://localhost:3001/api/v1/add-card', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(card)
        // }).then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log(err);
        // })
    }

    return(
        <div>
            <h2>Add Card</h2>
            <form onSubmit={handleSubmit}>
                <label>Deck: </label>
                {decks && 
                    <select
                    value={deck}
                    onChange={(e) => setDeck(e.target.value)}
                    >
                    {/* <option value="default">Default</option>
                    <option value="deck 2">Deck 2</option> */}
                    {decks.map((deck) => {
                        return <option value={deck.name}>{deck.name}</option>
                    })}
                    </select>   
                }
                <br/>

                <label>Front: </label>
                <br/>
                <textarea
                    required
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                ></textarea>
                <br/>

                <label>Back: </label>
                <br/>
                <textarea
                    required
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                ></textarea>
                <br/>

                <button>Add Card</button>
            </form>
        </div>
    )
}

export default AddCard;

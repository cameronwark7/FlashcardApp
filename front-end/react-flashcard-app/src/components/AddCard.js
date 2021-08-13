import { useState } from "react";

const AddCard = () => {

    const [deck, setDeck] = useState('default');
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const card = {deck, front, back};
        console.log(card);
    }

    return(
        <div>
            <h2>Add Card</h2>
            <form onSubmit={handleSubmit}>
                <label>Deck: </label>
                <select
                    value={deck}
                    onChange={(e) => setDeck(e.target.value)}
                >
                    <option value="default">Default</option>
                </select>

                <label>Front: </label>
                <textarea
                    required
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                ></textarea>

                <label>Back: </label>
                <textarea
                    required
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                ></textarea>

                <button>Add Card</button>
            </form>
        </div>
    )
}

export default AddCard;

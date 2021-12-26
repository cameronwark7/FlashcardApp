import { useState } from "react";

const Study = () => {

    const [deck, setDeck] = useState('default');

    const study = () => {
        fetch('http://localhost:3001/api/v1/get-cards')
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return(
        <div>
            <label>Deck: </label>
            <select
                value={deck}
                onChange={(e) => setDeck(e.target.value)}
            >
                <option value="default">Default</option>
            </select>
            <button onClick={study}>Study</button>
        </div>
    )
}

export default Study;
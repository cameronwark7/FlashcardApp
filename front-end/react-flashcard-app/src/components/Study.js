import { useState } from "react";

const Study = () => {

    const [deck, setDeck] = useState('default');

    return(
        <div>
            <h1>Study</h1>
            <label>Deck: </label>
                <select
                    value={deck}
                    onChange={(e) => setDeck(e.target.value)}
                >
                    <option value="default">Default</option>
                </select>
        </div>
    )
}

export default Study;
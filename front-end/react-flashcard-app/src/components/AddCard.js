const AddCard = () => {
    return(
        <div>
            <h2>Add Card</h2>
            <form>
                <label>Deck: </label>
                <select>
                    <option>Default</option>
                </select>

                <label>Front: </label>
                <textarea
                    required
                ></textarea>

                <label>Back: </label>
                <textarea
                    required
                ></textarea>

                <button>Add Card</button>
            </form>
        </div>
    )
}

export default AddCard;
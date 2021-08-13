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
                <input 
                    type="text" 
                    required
                />

                <label>Back: </label>
                <input 
                    type="text" 
                    required
                />
                
                <button>Add Card</button>
            </form>
        </div>
    )
}

export default AddCard;
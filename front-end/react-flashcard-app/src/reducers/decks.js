export default (decks = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_DECKS':
            return action.payload;
        case 'CREATE_DECK':
            console.log(JSON.parse(action.payload))
            return JSON.parse(action.payload);
            // return [...decks, action.payload];
        default:
            return decks;
    }
}

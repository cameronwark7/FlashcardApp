export default (decks = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_DECKS':
            return action.payload[0].decks;
        case 'CREATE_DECK':
            return JSON.parse(action.payload);
            // return [...decks, action.payload];
        default:
            return decks;
    }
}

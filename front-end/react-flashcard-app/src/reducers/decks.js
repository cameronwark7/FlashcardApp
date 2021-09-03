export default (decks = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_DECKS':
            return action.payload;
        case 'CREATE_DECK':
            return [...decks, action.payload];
        default:
            return decks;
    }
}

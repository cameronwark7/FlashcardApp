export default (cards = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_DECKS':
            return action.payload;
        case 'FETCH_ALL':
            return cards;
        case 'CREATE':
            return cards;
        default:
            return cards;
    }
}

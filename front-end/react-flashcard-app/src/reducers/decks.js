export default (decks = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_DECKS':
            return action.payload;
        case 'CREATE_DECK':
            // payload is 'data' coming from 'const { data } = await api.createDeck(post);' in actions directory
            return [...decks, action.payload];
        default:
            return decks;
    }
}

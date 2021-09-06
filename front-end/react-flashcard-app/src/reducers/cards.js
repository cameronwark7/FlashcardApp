export default (cards = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_CARDS':
            return cards;
        case 'CREATE_CARD':
            return cards;
        default:
            return cards;
    }
}

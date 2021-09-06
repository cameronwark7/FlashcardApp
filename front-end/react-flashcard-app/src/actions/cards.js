import * as api from '../api';

const addCard = () => {
    return {
        type: 'CREATE_CARD'
    }
}

const fetchAll = () => {
    return {
        type: 'FETCH_ALL_CARDS'
    }
}

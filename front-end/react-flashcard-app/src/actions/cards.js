import * as api from '../api';

const addCard = () => {
    return {
        type: 'CREATE'
    }
}

const fetchAll = () => {
    return {
        type: 'FETCH_ALL'
    }
}

// using thunk to handle asynchronous logic
export const getDecks = () => async (dispatch) => {
    try 
    {
        const { data } = await api.fetchDecks();
        // redux-thunk requires 'dispatch(action)' instead of 'return action'
        dispatch({ type: 'FETCH_ALL_DECKS', payload: data });
    } 
    catch (error) 
    {
        console.log(error.message);
    }
}

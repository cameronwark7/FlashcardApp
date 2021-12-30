import React, { useEffect } from 'react';
import { getDecks } from '../actions/decks';
import { useDispatch } from 'react-redux';

const Homepage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        if (user != null) {
        const email = user.result.email;
        const obj = {
            email
        }
        dispatch(getDecks(obj));
        }
    }, [dispatch]);

    return(
        <div>
            <h2>Homepage</h2>
        </div>
    )
}

export default Homepage;
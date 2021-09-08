import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {

    // 'profile' set in auth.js reducer.
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, []);

    return(
        <div>
            <Link to="/">Home</Link>
            <Link to="/add-card">Add Cards</Link>
            <Link to="/study">Study</Link>
            <Link to="/decks">Decks</Link>
            <Link to="/login">Sign in</Link>
        </div>
    )
}

export default Navbar;

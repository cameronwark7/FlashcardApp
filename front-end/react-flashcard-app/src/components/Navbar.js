import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div>
            <Link to="/">Home</Link>
            <Link to="/add-card">Add Card</Link>
            <Link to="/study">Study</Link>
            <Link to="/login">Sign in</Link>
        </div>
    )
}

export default Navbar;

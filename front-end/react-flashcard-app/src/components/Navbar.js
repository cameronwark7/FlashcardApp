import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div>
            <div>Home</div>
            <Link to="/">home</Link>

            <div>Add Card</div>
            <Link to="/add-card">add card</Link>
        </div>
    )
}

export default Navbar;

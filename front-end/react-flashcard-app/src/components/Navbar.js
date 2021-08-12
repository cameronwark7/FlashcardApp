import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div>
            <Link to="/">home</Link>
            <Link to="/add-card">add card</Link>
        </div>
    )
}

export default Navbar;

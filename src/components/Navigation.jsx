import { NavLink } from "react-router";

const Navigation = ({ isLogged, onLogOut }) => {
    return (
        <nav>
            <h1>Shopping Cart</h1>
            <div>
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/product">Product</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                { isLogged ? (
                    <button type="button" onClick={onLogOut} className="btn-logout">Log Out</button>
                ) : (
                    <NavLink to="/login">Login</NavLink> 
                )}
            </div>
        </nav>
    );
};

export default Navigation;
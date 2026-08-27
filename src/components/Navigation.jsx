import { NavLink } from "react-router";

// const Navigation = ({ isLogged, onLogOut }) => {
const Navigation = () => {
    return (
        <nav>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'var(--color-on-text)' }}><h1>Shopping Cart</h1></NavLink>
            <div>
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                {/* { isLogged ? (
                    <button type="button" onClick={onLogOut} className="btn-logout">Log Out</button>
                ) : (
                    <NavLink to="/login">Login</NavLink> 
                )} */}
            </div>
        </nav>
    );
};

export default Navigation;
import { NavLink } from "react-router";

const Navigation = () => {
    return (
        <nav>
            <h1>Shopping Cart</h1>
            <div>
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/product">Product</NavLink>
                <NavLink to="/cart">Cart</NavLink>
            </div>
        </nav>
    );
};

export default Navigation;
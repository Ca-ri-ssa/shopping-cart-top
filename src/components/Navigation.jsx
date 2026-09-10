import { NavLink } from "react-router";
import './Navigation.css';

const Navigation = () => {
    return (
        <nav>
            <NavLink to="/" className="navlink-title">
                <h1>Shopping Cart</h1>
            </NavLink>

            <div>
                <NavLink to="/" end>
                    <span className="nav-icon material-symbols-rounded">
                        home
                    </span>
                    <span className="nav-label">
                        Home
                    </span>
                </NavLink>

                <NavLink to="/cart">
                    <span className="nav-icon material-symbols-rounded">
                        shopping_cart
                    </span>
                    <span className="nav-label">
                        Cart
                    </span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navigation;
import { createContext, useState } from "react";

const CartContext = createContext();

// TODO: lengkapi
const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);

    const addToCart = () => {

    }

    return (
        <CartContext.Provider value={{ cartItem, addToCart }}>
            {children}
        </CartContext.Provider>
    )
};

export { CartContext };
export default CartProvider;
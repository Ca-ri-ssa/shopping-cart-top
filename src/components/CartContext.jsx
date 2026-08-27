import { createContext, use, useEffect, useState } from "react";
import { CART_KEY } from "../data/config";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem(CART_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart data in local storage data", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            const existItemIndex = prevItems.findIndex(
                (item) => item.id === product.id
            )

            if (existItemIndex !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[existItemIndex] = {
                    ...updatedItems[existItemIndex],
                    quantity: updatedItems[existItemIndex].quantity + quantity,
                };
                return updatedItems;
            }
            return [...prevItems, {...product, quantity}];
        });
    };

    const updateCart = (productId, newQuantity) => {
        setCartItems((prevItems) => {
            if(newQuantity <= 0) {
                return prevItems.filter((item) => item.id !== productId)
            }

            return prevItems.map((item) => 
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    const removeCartItem = (productId) => {
        setCartItems((prevItems) => {
            prevItems.filter((item) => item.id !== productId)
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCart, removeCartItem }}>
            {children}
        </CartContext.Provider>
    )
};

export { CartContext };
export default CartProvider;
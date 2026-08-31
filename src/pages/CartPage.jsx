import { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";
import CartContainer from "../components/CartContainer";
import { ShowToast } from "../components/StatusBar";

const CartPage = () => {
    const { cartItems, removeCartItem } = useContext(CartContext);
    const [ toast, setToast ] = useState(null);

    // TODO 1: add display for 0 length items, having a message to encourage user to add cart item
    // TODO 2: ensure show toast is displayed correctly (also the styling and position)
    // TODO 3: put a subtotal by using useMemo()
    const handleRemove = (item) => {
        removeCartItem(item.id, item.title);
        setToast(
            <>
                <b style={{ marginRight: '4px' }}>{item.title}</b>removed from cart
            </>
        );
    }

    return (
        <section id="cart">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cartItems.map((item) => (
                    <CartContainer key={item.id} cartItem={item} onRemove={() => handleRemove(item)}/>
                ))}
            </div>
            
            <aside>
                <h1>Total product: {cartItems.length}</h1>

                { toast && (
                    <ShowToast key={Date.now()} marginTop={20} text={toast} onClose={() => setToast(null)}/>
                )}
            </aside>
        </section>
    )
};

export default CartPage;
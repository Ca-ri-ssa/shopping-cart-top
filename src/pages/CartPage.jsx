import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartContainer from "../components/CartContainer";
import { Link } from "react-router";
import { formatPrice } from "../utils/utils";

const CartPage = () => {
    const { cartItems, removeCartItem } = useContext(CartContext);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if(!toast) return;
        const timer = setTimeout(() => {
            setToast(null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [toast]);

    const showToast = (title, msg) => {
        setToast({
            title: title,
            msg: msg
        })
    };

    const handleRemove = (item) => {
        removeCartItem(item.id, item.title);
        showToast(item.title, 'has been removed from the cart')
    };

    const onCheckOut = () => {
        showToast('Notice:', 'This feature is not implemented yet')
    };

    const totalItem = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if(cartItems.length === 0) {
        return (
            <section id="no-page">
                <h1>Your Cart is empty!</h1>
                <p>Looks like you haven't added anything yet. Let's explore our products!</p>
                <Link to="/" className="link">Start Shopping</Link>
            </section>
        );
    }

    return (
        <section id="cart">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cartItems.map((item) => (
                    <CartContainer key={item.id} cartItem={item} onRemove={() => handleRemove(item)}/>
                ))}
            </div>
            
            <aside className="cart-aside">
                <h2 style={{ fontWeight: 'normal' }}>
                    Total cart item: <span style={{ fontWeight: 'bold' }}>{totalItem}</span>
                </h2>
                <h2 style={{ fontWeight: 'normal' }}>
                    Subtotal: <span style={{ fontWeight: 'bold' }}>{formatPrice(subTotal)}</span>
                </h2>
                <button style={{ marginTop: '20px' }} className="btn btn-checkout" onClick={onCheckOut}>
                    Check Out
                </button>

                { toast && (
                    <p style={{ marginTop: '16px', color: 'var(--color-error)' }}>
                        <b>{toast.title}</b> {toast.msg}
                    </p>
                )}
            </aside>
        </section>
    )
};

export default CartPage;
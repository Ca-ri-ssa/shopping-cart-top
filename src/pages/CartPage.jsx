import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartContainer from "../components/CartContainer";
import { Link } from "react-router";
import { formatPrice } from "../utils/utils";
import DialogPopUp from "../components/DialogPopUp";

const CartPage = () => {
    const { cartItems, removeCartItem } = useContext(CartContext);
    const [toast, setToast] = useState(null);
    const [itemToRemove, setItemToRemove] = useState(null);

    useEffect(() => {
        if(!toast) return;
        const timer = setTimeout(() => {
            setToast(null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [toast]);

    console.log("item to remove:", itemToRemove);

    const showToast = (title, msg) => {
        setToast({
            title: title,
            msg: msg
        })
    };
    
    const handleOpenDialogRemove = (item) => {
        setItemToRemove(item);
    };

    const handleConfirmDialogRemove = () => {
        if(itemToRemove) {
            removeCartItem(itemToRemove.id);
            showToast(itemToRemove.title, 'has been removed from the cart');
            setItemToRemove(null);
        }
    };

    const handleCloseDialogRemove = () => {
        setItemToRemove(null)
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
                    <CartContainer 
                    key={item.id}
                    cartItem={item}
                    onRemove={() => handleOpenDialogRemove(item)}
                    />
                ))}
            </div>
            
            <aside className="cart-aside">
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Summary</h1>
                <h3 style={{ fontWeight: 'normal' }}>
                    Total cart item: <span style={{ fontWeight: 'bold' }}>{totalItem}</span>
                </h3>
                <h3 style={{ fontWeight: 'normal' }}>
                    Subtotal: <span style={{ fontWeight: 'bold' }}>{formatPrice(subTotal)}</span>
                </h3>
                <button style={{ marginTop: '20px' }} className="btn btn-checkout" onClick={onCheckOut}>
                    Check Out
                </button>

                { toast && (
                    <p style={{ marginTop: '16px', color: 'var(--color-error)' }}>
                        <b>{toast.title}</b> {toast.msg}
                    </p>
                )}
            </aside>
            
            {itemToRemove && (
                <DialogPopUp
                title="Remove Item"
                textConfirm="Remove"
                textClose="No"
                message={
                <>
                Do want to remove{" "}
                <span style={{ fontWeight: 'bold' }}>{itemToRemove?.title}</span>
                {" "}from your cart?
                </>
                }
                onConfirm={handleConfirmDialogRemove}
                onClose={handleCloseDialogRemove}
                />
            )}
        </section>
    )
};

export default CartPage;
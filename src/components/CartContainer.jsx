const CartContainer = ({ cartItem, onRemove }) => {
    const handleRemoveItem = (e) => {
        e.preventDefault();
        onRemove();
    }

    return (
        <a className="cart-container" href={`/products/${cartItem.id}`}>
            <div className="cart-img-container">
                <img src={cartItem.image} alt={cartItem.title} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: '2' }}>{cartItem.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                    <p style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
                        {cartItem.quantity} 
                        <span className="material-symbols-rounded" style={{ fontSize: '12px' }}>
                        close
                        </span>
                        ${cartItem.price}
                    </p>
                    <p style={{ fontWeight: 'bold' }}>${cartItem.quantity * cartItem.price}</p>
                </div>
                
                
            </div>
            <button className="btn-cart-remove" onClick={handleRemoveItem}>
                <span className="material-symbols-rounded">
                delete
                </span>
            </button>
        </a>
    )
};

export default CartContainer;
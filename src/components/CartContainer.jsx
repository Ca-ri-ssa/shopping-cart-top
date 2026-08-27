const CartContainer = ({ cartItem, onAdd, onReduce, onRemove }) => {
    // TODO: lengkapi dan belum buat styling di css
    return (
        <a className="cart-container" href={`/products/${cartItem.id}`}>
            <img src={cartItem.image} alt={cartItem.title} />
        </a>
    )
};

export default CartContainer;
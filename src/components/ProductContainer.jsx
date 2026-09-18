const ProductContainer = ({ product }) => {
    const styles = {
        h3 : {
            width: '100%',
            marginTop: '16px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
        },
        p: {
            width: '100%',
            textAlign: 'end',
        },
        category: {
            fontSize: '12px',
            textAlign: 'start',
            marginBottom: '8px',
            width: '100%',
        }
    };

    return (
        <a className="product-container" href={`/products/${product.id}`}>
            <div className="product-container-img">
                <img src={product.image} alt={product.title} />
            </div>
            <h3 style={styles.h3} >{product.title}</h3>
            <p style={styles.category}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
            <p style={styles.p} >${product.price}</p>
        </a>
    )
};

export default ProductContainer;
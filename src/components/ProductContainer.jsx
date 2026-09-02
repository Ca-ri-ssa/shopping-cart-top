const ProductContainer = ({ product }) => {
    const styles = {
        image : {
            maxHeight: '100px',
            borderRadius: '8px'
        },
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
            <img style={styles.image} src={product.image} alt={product.title} />
            <h3 style={styles.h3} >{product.title}</h3>
            <p style={styles.category}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
            <p style={styles.p} >${product.price}</p>
        </a>
    )
};

export default ProductContainer;
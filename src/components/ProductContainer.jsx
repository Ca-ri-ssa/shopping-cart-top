const ProductContainer = ({ product }) => {
    const styles = {
        image : {
            maxHeight: '100px',
            borderRadius: '8px'
        },
        h3 : {
            width: '100%',
            marginTop: '16px',
            marginBottom: '8px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
        },
        p: {
            width: '100%',
            textAlign: 'end',
        }
    };

    return (
        <a className="product-container" href={`/products/${product.id}`}>
            <img style={styles.image} src={product.image} alt={product.title} />
            <h3 style={styles.h3} >{product.title}</h3>
            <p style={styles.p} >${product.price}</p>
        </a>
    )
};

export default ProductContainer;
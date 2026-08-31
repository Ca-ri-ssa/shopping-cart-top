import { useParams } from "react-router";
import { ProductContext } from "../components/ProductContext";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../components/CartContext";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const { cartItems, addToCart, updateCart } = useContext(CartContext);
    const imgRef = useRef(null);

    const productDetail = products.find((item) => {
        return item.id === parseInt(id, 10);
    });

    const findCartItem = cartItems.find((item) => item.id === productDetail?.id);
    const isInCart = Boolean(findCartItem);

    const [quantity, setQuantity] = useState(findCartItem ? findCartItem.quantity : 0);

    useEffect(() => {
        if (findCartItem) {
            setQuantity(findCartItem.quantity);
        }
    }, [findCartItem?.quantity]);

    useEffect(() => {
        console.log("Current Cart Items:", JSON.stringify(cartItems, null, 2));
    }, [cartItems]);

    if (!productDetail) {
        return <h2>Loading product details...</h2>;
    }

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        if (imgRef.current) {
            imgRef.current.style.setProperty("--x", `${x}%`);
            imgRef.current.style.setProperty("--y", `${y}%`);
        }
    }

    const handleMouseLeave = () => {
        if (imgRef.current) {
            imgRef.current.style.setProperty("--x", "center");
            imgRef.current.style.setProperty("--y", "center");
        }
    };

    const onAdd = () => {
        setQuantity((prev) => prev + 1);
    }

    const onReduce = () => {
        setQuantity((prev) => Math.max(0, prev - 1));
    }

    const onHandleChange = (e) => {
        const val = parseInt(e.target.value, 10);
        setQuantity(isNaN(val) ? 0 : Math.max(0, val));
    }
    
    const handleCartSubmit = () => {
        if (quantity === 0 && isInCart) {
            updateCart(productDetail.id, 0);
        } else if (isInCart) {
            updateCart(productDetail.id, quantity);
        } else if (quantity > 0) {
            addToCart(productDetail, quantity);
        }
    }

    return (
        <>
         <section id="product-detail">
            <div className="product-img-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}>
                <img ref={imgRef} src={productDetail.image} alt={productDetail.title} />
            </div>
            <aside>
                <h1>{productDetail.title}</h1>
                <p style={{ fontSize: '14px'}}>
                    {productDetail.category}
                </p>

                <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                    <p style={{ fontSize: '24px' }}>${productDetail.price}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span className="material-symbols-rounded" style={{ color: 'var(--rating-star-color)' }}>star</span> {productDetail.rating.rate}</p>
                </div>

                <p style={{ fontWeight: 'bold', margin: '20px 0 8px 0' }}>Description:</p>
                <p>{productDetail.description}</p>

                <div style={{ display:'flex', flexDirection: 'row', gap: '16px', marginTop: '24px', alignItems:'stretch' }}>
                    <div className="quantity">
                        <button style={{ borderRadius: '8px 0 0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="btn-quantity" onClick={onReduce} disabled={quantity <= 0}>
                            <span className="material-symbols-rounded">
                                remove
                            </span>
                        </button>
                        <input
                        id="quantity"
                        type="text"
                        value={quantity}
                        onChange={onHandleChange}
                        />
                        <button style={{ borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="btn-quantity" onClick={onAdd}>
                            <span className="material-symbols-rounded">
                                add
                            </span>
                        </button>
                    </div>

                    <button className="btn-submit-cart" onClick={handleCartSubmit} disabled={quantity === 0 && !isInCart}>
                        {isInCart ? (quantity === 0 ? "Remove From Cart" : "Update Cart") : "Add to Cart" }
                    </button>
                </div>
                
            </aside>
         </section>
        </>
    )
};

export default ProductDetailPage;
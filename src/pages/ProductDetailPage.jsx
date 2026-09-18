import { Link, useParams } from "react-router";
import { ProductContext } from "../context/ProductContext";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/utils";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { products, loading, error } = useContext(ProductContext);
    const { cartItems, addToCart, updateCart } = useContext(CartContext);
    const imgRef = useRef(null);
    const [toast, setToast] = useState(null);

    const productDetail = products.find((item) => {
        return item.id === parseInt(id, 10);
    });

    const findCartItem = cartItems.find((item) => item.id === productDetail?.id);
    const isInCart = Boolean(findCartItem);

    const [quantity, setQuantity] = useState(findCartItem ? findCartItem.quantity : 0);
    
    useEffect(() => {
        if(!toast) return;
        const timer = setTimeout(() => {
            setToast(null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [toast]);

    useEffect(() => {
        if (findCartItem) {
            setQuantity(findCartItem.quantity);
        }
    }, [findCartItem?.quantity]);

    if(loading) {
         return (
            <section id="no-page">
                <div className="loading-msg">
                    <div className="loader"></div>
                    <h1>Loading product...</h1>
                </div>
            </section>
        );
    };

    if(error) {
         return (
            <section id="no-page">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                    <h1 style={{ color: 'var(--color-error)' }}>Error: {error}</h1>
                </div>
            </section>
        );
    }

    if (!productDetail) {
        return (
            <section id="no-page">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--color-error)' }}>
                    <h1>No product available</h1>
                    <Link to="/" className="link">Go back</Link>
                </div>
            </section>
        );
    };

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
            setToast(`Removed from the cart`);
        } else if (isInCart) {
            updateCart(productDetail.id, quantity);
            setToast(`Quantity updated to ${quantity}`);
        } else if (quantity > 0) {
            addToCart(productDetail, quantity);
            setToast(`Added to cart`);
        }
    };

    return (
        <>
         <section id="product-detail">
            <div className="product-detail-img"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}>
                <img ref={imgRef} src={productDetail.image} alt={productDetail.title} />
            </div>

            <aside>
                <h1>{productDetail.title}</h1>
                <p style={{ fontSize: '14px'}}>
                    {productDetail.category.charAt(0).toUpperCase() + productDetail.category.slice(1)}
                </p>

                <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                    <p style={{ fontSize: '24px' }}>{formatPrice(productDetail.price)}</p>
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

                    <button className="btn" onClick={handleCartSubmit} disabled={quantity === 0 && !isInCart}>
                        {isInCart ? (quantity === 0 ? "Remove From Cart" : "Update Cart") : "Add to Cart" }
                    </button>
                </div>
                { toast && (
                    <p style={{ marginTop: '16px' }}>{toast}</p>
                )}
            </aside>
         </section>
        </>
    )
};

export default ProductDetailPage;
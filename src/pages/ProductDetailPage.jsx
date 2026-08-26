import { useParams } from "react-router";
import { ProductContext } from "../components/ProductContext";
import { useContext, useRef } from "react";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const imgRef = useRef(null);

    // TODO: lengkapi

    const productDetail = products.find((item) => {
        return item.id === parseInt(id);
    });

    console.log(id);
    console.log(productDetail);

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

                <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center', marginTop: '8px' }}>
                    <p>⭐</p>
                    <p>{productDetail.rating.rate}</p>
                </div>

                <p style={{ fontWeight: 'bold', margin: '20px 0 8px 0' }}>Description:</p>
                <p>{productDetail.description}</p>

                <p style={{ fontWeight: 'bold', margin: '20px 0 8px 0' }}>Price:</p>
                <p style={{ fontWeight: 'bold', fontSize: '24px' }}>${productDetail.price}</p>

                {/* TODO: add quantity and add to cart btn */}
            </aside>
         </section>
        </>
    )
};

export default ProductDetailPage;
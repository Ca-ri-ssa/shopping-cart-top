import { useParams } from "react-router";
import { ProductContext } from "../components/ProductContext";
import { useContext } from "react";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { products } = useContext(ProductContext);

    // TODO: lengkapi

    const productDetail = products.find((item) => {
        return item.id === parseInt(id);
    });

    console.log(id);
    console.log(productDetail);

    if (!productDetail) {
        return <h2>Loading product details...</h2>;
    }

    return (
        <>
         <section id="product-detail">
            <img src={productDetail.image} />
            <aside>
                <h2>{productDetail.title}</h2>
            </aside>
         </section>
        </>
    )
};

export default ProductDetailPage;
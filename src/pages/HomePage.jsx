import { useEffect, useState } from "react";
import ProductContainer from "../components/ProductContainer";
import apiService from "../data/apiService";

// TODO: this is store Home Page
const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        apiService.getAllProduct()
            .then((data) => setProducts(data))
            .catch((err) => console.error(err))
    }, []);

    return (
        <section id="home">
            <h1>Home</h1>
            <div className="product-grid">
                {products.map((item) => (
                    <ProductContainer key={item.id} product={item}/>
                ))}
            </div>
        </section>
    )
};

export default HomePage;
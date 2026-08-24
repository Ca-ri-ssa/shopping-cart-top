import { useContext, useState } from "react";
import ProductContainer from "../components/ProductContainer";
import { Button } from "../components/Button";
import { ErrorBar } from "../components/StatusBar";
import { ProductContext } from "../components/ProductContext";

const HomePage = () => {
    const { products } = useContext(ProductContext);
    const [queryInput, setQueryInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    
    const searchButton = () => {
        setSearchQuery(queryInput);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchButton();
        };
    };

    const searchedProduct = products.filter((item) => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showError = searchedProduct.length === 0 && searchQuery.trim() !== "";

    return (
        <>
            <section id="hero">
                <div className="hero-card">
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <h1 style={{ fontSize: "64px" }}>Welcome to Shopping Cart!</h1>
                        <p style={{ fontSize: "32px" }}>Browse your favorite product and add it to the cart 🛒</p>
                    </div>
                    <Button fontSize={20} width={"fit"} paddingInline={32} text={"Let's Browse"} />
                </div>
            </section>

            <section id="home" style={{ paddingTop: "0" }}>
                <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
                    <input
                    type="text"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder="Search product"
                    className="search-product"
                    onKeyDown={handleKeyDown}
                    />
                    <Button width={"fit"} text={"Search"} paddingInline={16} action={searchButton} />
                </div>

                {showError && <ErrorBar text={`${searchQuery} is unavailable`} />}

                <div style={{ marginTop: "20px" }} className="product-grid">
                    { 
                        searchedProduct.map((item) => (
                            <ProductContainer key={item.id} product={item}/>
                        )) 
                    }
                </div>
            </section>
        </>
    )
};

export default HomePage;
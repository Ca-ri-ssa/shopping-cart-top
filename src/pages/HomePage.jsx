import { useContext, useState } from "react";
import ProductContainer from "../components/ProductContainer";
import { ProductContext } from "../context/ProductContext";
import NewsTicker from "../components/NewsTicker";

// TODO: put loading and error mechanism
const HomePage = () => {
    const { products, loading, error } = useContext(ProductContext);
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
            <NewsTicker />
            <section id="hero">
                <div className="hero-card">
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <h1 style={{ fontSize: "64px" }}>Welcome to Shopping Cart!</h1>
                        <p style={{ fontSize: "32px" }}>Browse your favorite product and add it to the cart 🛒</p>
                    </div>
                    <button style={{ fontSize: '20px', padding: '16px 40px'}} className="btn">Let's Browse</button>
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
                    <button className="btn" onClick={searchButton}>Search</button>
                </div>

                {/* TODO: Perbaiki error, jgn pakai status bar lagi */}
                {/* {showError && <ErrorBar text={`${searchQuery} is unavailable`} />} */}

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
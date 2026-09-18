import { useContext, useState } from "react";
import ProductContainer from "../components/ProductContainer";
import { ProductContext } from "../context/ProductContext";
import NewsTicker from "../components/NewsTicker";

const HomePage = () => {
    const { products, loading, error } = useContext(ProductContext);

    const [queryInput, setQueryInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [categoryInput, setCategoryInput] = useState("");
    const [categorySelected, setCategorySelected] = useState("");
    
    const searchButton = () => {
        setSearchQuery(queryInput);
        setCategorySelected(categoryInput);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchButton();
        };
    };

    const searchedProduct = products.filter((item) => {
        const matchSearchQuery = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = 
            !categorySelected || 
            categorySelected === "" || 
            categorySelected === "all" || 
            item.category === categorySelected;

        return matchSearchQuery && matchCategory;
    });

    const showSearchNotFound = searchedProduct.length === 0 && searchQuery.trim() !== "";
    const productCategory = Array.from(new Set(products.map((item) => item.category).filter(Boolean)));
    const category = ["all", ...productCategory].sort();

    return (
        <>
            <NewsTicker />
            <section id="hero">
                <div className="hero-card">
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <h1>Welcome to Shopping Cart!</h1>
                        <p>Browse your favorite product and add it to the cart 🛒</p>
                    </div>
                    <button className="btn">Let's Browse</button>
                </div>
            </section>

            <section id="home" style={{ paddingTop: "0" }}>
                <div className="search-field">
                    <input
                    type="text"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder="Search product"
                    className="search-product"
                    onKeyDown={handleKeyDown}
                    />

                    <select 
                    id="category" 
                    name="category"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}>
                        {category.map((item, index) => (
                            <option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
                        ))}
                    </select>

                    <button className="btn" onClick={searchButton}>Search</button>
                </div>

                { loading && (
                    <div className="loading-msg">
                        <div className="loader"></div>
                        <h1>Loading product...</h1>
                    </div>
                )}

                { error && (
                    <p style={{ width: "100%", textAlign: "center", color: "var(--color-error)", marginTop: "20px" }}>
                        Failed to load product, please try again later
                    </p>
                )}

                { showSearchNotFound && (
                    <p style={{ width: "100%", textAlign: "center", color: "var(--color-error)", marginTop: "20px" }}>
                        <span style={{ fontWeight: "bold" }}>{searchQuery}</span> is unavailable
                    </p>
                )}

                {!loading && !error && (
                    <div style={{ marginTop: "20px" }} className="product-grid">
                    { 
                        searchedProduct.map((item) => (
                            <ProductContainer key={item.id} product={item}/>
                        )) 
                    }
                </div>
                )}
            </section>
        </>
    )
};

export default HomePage;
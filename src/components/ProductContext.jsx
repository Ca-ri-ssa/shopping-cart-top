import { createContext, useEffect, useState } from "react";
import apiService from "../data/apiService";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    // TODO: tambah mekanisme loading dan error

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await apiService.getAllProduct();
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, []);

    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext };
export default ProductProvider;
import App from "./App.jsx";
import CartPage from "./pages/CartPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ProductPage from "./pages/ProductPage.jsx";

// TODO: create route
const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "product",
                children: [
                    {
                        index: true,
                        element: <ProductPage />
                    },
                    {
                        path: ":id",
                        element: <ProductDetail />
                    }
                ]
            },
            {
                path: "cart",
                element: <CartPage />
            },
            {
                path: "login",
                element: <LoginPage />
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage />
    }
];

export default routes;
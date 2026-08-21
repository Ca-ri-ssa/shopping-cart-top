import App from "./App.jsx";
import CartPage from "./pages/CartPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";

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
                path: "products/:id",
                element: <ProductDetailPage />
            },
            {
                path: "cart",
                element: <CartPage />
            },
            // FIX: Omit login and sign up
            // {
            //     path: "login",
            //     element: <LoginPage />
            // },
            // {
            //     path: "signup",
            //     element: <SignUpPage />
            // }
        ]
    },
    {
        path: "*",
        element: <ErrorPage />
    }
];

export default routes;
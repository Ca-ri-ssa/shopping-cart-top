import './index.css'
import Navigation from './components/Navigation.jsx'
import { Outlet } from 'react-router'
import Footer from './components/Footer.jsx'
import ProductProvider from './components/ProductContext.jsx'
import CartProvider from './components/CartContext.jsx'

function App() {
  // const [session, setSession] = useState(true);

  // const checkSession = () => {
  //   const inSession = Boolean(localStorage.getItem(USER_ID_KEY));
  //   setSession(inSession);
  // }

  // useEffect(() => {
  //   checkSession();
  // }, [])

  // const logOut = () => {
  //   const isConfirm = window.confirm("Do you want to log out?");
  //   if (isConfirm) {
  //     localStorage.removeItem(USER_ID_KEY);
  //     checkSession();
  //   };
  // };

  return (
    <>
      {/* <Navigation isLogged={session} onLogOut={logOut}/> */}
      <ProductProvider>
        <CartProvider>
          <Navigation />
          <Outlet />
          <Footer />
        </CartProvider>
      </ProductProvider>
    </>
  )
}

export default App

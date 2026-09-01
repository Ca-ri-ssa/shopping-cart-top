import './index.css'
import Navigation from './components/Navigation.jsx'
import { Outlet } from 'react-router'
import Footer from './components/Footer.jsx'
import ProductProvider from './context/ProductContext.jsx'
import CartProvider from './context/CartContext.jsx'

function App() {

  return (
    <>
      <ProductProvider>
        <CartProvider>
          <div className='app-layout'>
            <Navigation />
            <main className='main-content'>
              <Outlet />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </ProductProvider>
    </>
  )
}

export default App

import './index.css'
import Navigation from './components/Navigation.jsx'
import { Outlet } from 'react-router'
import Footer from './components/Footer.jsx'
import ProductProvider from './components/ProductContext.jsx'
import CartProvider from './components/CartContext.jsx'

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

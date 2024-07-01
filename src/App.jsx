
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Home from './pages/home/Home'
import Footer from './global/footer/Footer'
import Navbar from './global/navbar/Navbar'
import Product from './pages/product/Product'
import { Provider } from 'react-redux'
import Store from './store/Store'
import Cart from './pages/Cart/Cart.jsx'
import ScrollManager from './global/scroller/ScrollerManager.js'
import ScrollBtn from './global/scroller/ScrollBtn.jsx'
import Register from './pages/register/Register.jsx'
function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Navbar />
        <ScrollManager />
        <ScrollBtn/>
        <Routes>
          <Route path='/singup' element={<Register/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App

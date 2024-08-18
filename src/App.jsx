
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
import ProtectedRoute from './ProtectedRoute.jsx'
import RedirectIfAuthenticated from './RedirectIfAuthenticated.jsx'
import CheckOut from './pages/checkout/CheckOut.jsx'
import MyOrder from './pages/myorder/MyOrder.jsx'
import OrderDetails from './pages/orderdetails/OrderDetails.jsx'
function App() {
  const token=localStorage.getItem('token')
  return (
    <>
    
    <Provider store={Store}>
      <BrowserRouter>
        <Navbar />
        <ScrollManager />
        <ScrollBtn/>
        <Routes>
          <Route element={<RedirectIfAuthenticated/>}>
            <Route path='/singup' element={<Register/>} />
          </Route>
          <Route element={<RedirectIfAuthenticated/>}>
            <Route path='/login' element={<Login/>} />
          </Route>
          <Route path='/home' element={<Home />} />
          <Route path='/product' element={<Product />} />
          
          <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path='/Checkout' element={<CheckOut/>}/>
                <Route path='/myorder' element={<MyOrder/>}/>
                <Route path='/orderdetails/:id' element={<OrderDetails/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App

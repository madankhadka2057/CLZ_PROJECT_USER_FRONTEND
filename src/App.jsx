
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Home from './pages/home/Home'
import Footer from './global/footer/Footer'
import Navbar from './global/navbar/Navbar'
import Product from './pages/product/Product'
import {Provider} from 'react-redux'
import Store from './store/Store'
function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/product' element={<Product/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Provider>
  )
}

export default App

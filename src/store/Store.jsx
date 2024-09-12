
import {configureStore} from "@reduxjs/toolkit"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"
import OrderSlice from "./OrderSlice"
import authSlice from "./authSlice"


const Store=configureStore({
    reducer:{
        product:productSlice,
        cart:cartSlice,
        order:OrderSlice,
        auth:authSlice
    }
})
export default Store
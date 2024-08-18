
import {configureStore} from "@reduxjs/toolkit"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"
import OrderSlice from "./OrderSlice"


const Store=configureStore({
    reducer:{
        product:productSlice,
        cart:cartSlice,
        order:OrderSlice
    }
})
export default Store
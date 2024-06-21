
import {configureStore} from "@reduxjs/toolkit"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"


const Store=configureStore({
    reducer:{
        product:productSlice,
        cart:cartSlice
    }
})
export default Store
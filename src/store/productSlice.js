import { createSlice } from "@reduxjs/toolkit";
import { Api } from "../API/Api";



const productSlice=createSlice({
    name:"product",
    initialState:{
        data:[]
    },
    reducers:{
        setProduct(state,action){
            state.data=action.payload
        }
    }
})
export const {setProduct}=productSlice.actions
export default productSlice.reducer

export function fetchProduct(){
    return async function fetchProductThunk(dispatch){
            const response=await Api.get("admin/fetchproduct")
            // console.log("Hello i am from fetchProduct")
            // console.log(response.data.data)
            dispatch(setProduct(response.data.data))
    }
}
import { createSlice } from '@reduxjs/toolkit'
import { authenticatedApi } from '../API/Api'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: []
    },
    reducers: {
        addToCart(state, action) {
            state.data = action.payload
        }
    }
})
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer

export function setCartItem(productId) {

    return async function setCartItemThunk(dispatch) {

        // const id = { id: productId }
        const response=await authenticatedApi.post(`user/addtocart/`,{id:productId, quantity:1})
        console.log(response)
    }
}

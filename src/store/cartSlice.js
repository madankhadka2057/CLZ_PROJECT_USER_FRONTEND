import { createSlice } from '@reduxjs/toolkit'
import { Api, authenticatedApi } from '../API/Api'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: [],
        cartItem:[]
    },
    reducers: {
        addToCart(state, action) {
            state.data = action.payload
        },
        fetchCart(state,action){
            state.cartItem=action.payload
        },
        changeQuantity(state,action){
            const index=state.cartItem.findIndex((data)=>data.productId==action.payload.productId)
            if(index!=-1){
                state.cartItem[index].quantity=action.payload.quantity
            }else{
                console.log("index not found")
                console.log(index)
            }
        },
        removeCartItemsFromStore(state,action){
            state.cartItem=state.cartItem.filter((data)=>{
                // console.log(data.productId)
                 return data.productId!=action.payload.productId
            })
            // console.log(action.payload.productId)
        }
    }
})
export const { addToCart,fetchCart,changeQuantity,removeCartItemsFromStore } = cartSlice.actions
export default cartSlice.reducer

export function setCartItem(productId) {
    return async function setCartItemThunk(dispatch) {
        const response=await authenticatedApi.post(`cart/addtocart`,{id:productId, quantity:1})
        dispatch(fetchCart(response.data.data))
        console.log(response.data.data)
        
    }
}

export function fetchCartItem(){
    return async function fetchcartItemThank(dispatch){
        const response=await authenticatedApi.get(`cart/fetchcart`)
        // console.log(response)
        if(response.status==200){
            dispatch(fetchCart(response.data.data))
        }
    }
}

export function updateCartItem(productId,quantity){
    return async function updateCartItemThunk(dispatch){
        dispatch(changeQuantity({productId,quantity}))
        if(quantity>=2){

            const response= await authenticatedApi.post(`cart/updateqty`,{productId,quantity})
        }
        // console.log(response)
    }
}
export function RemoveItemFromCart(productId){
    return async function RemoveItemFromCartThunk(dispatch){
        // const productId=Id
        const response= await authenticatedApi.delete(`cart/deleteitem`,{data: { productId }} )
        if(response.status==200){
            dispatch(removeCartItemsFromStore({productId}))
        }
    }
}


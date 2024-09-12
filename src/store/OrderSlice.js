import { Api, authenticatedApi } from "../API/Api";

import { createSlice } from "@reduxjs/toolkit"


const OrderSlice=createSlice({
    name:"order",
    initialState:{
        data:[]
    },
    reducers:{
        setOrder(state,action){
            state.data=action.payload
        },
        setOrderDetails(state,action){
            state.data=action.payload
        },
        filterDelete:(state,action)=>{
            state.data=state.data.filter((data)=>{
               return data.id!=action.payload.id
            })
        }
    }
})
export default OrderSlice.reducer
export const {setOrder,filterDelete}=OrderSlice.actions

export function fetchOrder(){
    return async function fetchOrderthunk(dispatch){
        const response= await authenticatedApi.get('/user/order/myorder')
        dispatch(setOrder(response.data.data))
    }
}
export function fetchOrderDetails(id){
    return async function fetchOrderDetailsthunk(dispatch){
        const response= await authenticatedApi.get(`/user/order/orderdetails/${id}`)
        if(response.status==200){
            dispatch(setOrder(response.data.data))
        }
    }
}
export function cancleOrder(id) {
    return async function cancleOrderThunk(dispatch) {
        try {
            const response = await authenticatedApi.post(`/user/order/cancle/${id}`, { orderStatus: "cancelled" });
            // alert(response.data.message); // This will show the success message
            sessionStorage.setItem("toastMessage", JSON.stringify({ status: "success", message: response.data.message}));
            dispatch(setOrder(response.data.data));
            window.location.reload()
        } catch (error) {
            // Assuming the backend sends the error message in error.response.data.message
            if (error.response) {
                sessionStorage.setItem("toastMessage", JSON.stringify({ status: "error", message: error.response.data.message}));
                window.location.reload()
                // alert(error.response.data.message); // This will show the failure message
            } else {
                alert("Something went wrong. Please try again."); // Fallback error message
            }
        }
    };
}
export function deleteMyOrder(id){
    return async function deleteMyOrderThunk(dispatch) {
        try{
            console.log(id)
            const response=await authenticatedApi.delete(`/user/order/delete/${id}`)
            if(response.status==200){
                dispatch(filterDelete({id}))
            }
        }catch(err){
            console.log(err)
            alert("error")
        }
    }
}


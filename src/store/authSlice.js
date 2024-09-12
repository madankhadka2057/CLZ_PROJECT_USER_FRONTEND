import { createSlice } from "@reduxjs/toolkit";
import { authenticatedApi } from "../API/Api";
import Tostify from "../global/Toastify/Tostify";
import Confirm from "../global/confirm_dailog/Confirm";

const authSlice=createSlice({
   name:"auth" ,
   initialState:{
    data:[],
    confirmDailog:false
   },reducers:{
    setUser:(state,action)=>{
        state.data=action.payload
    },
    setConfirm(state,action){
        state.confirmDailog=action.payload
    }
   }
})
export const {setUser,setConfirm}=authSlice.actions
export default authSlice.reducer

export function getAuth(){
    return async function getAuthThunk(dispatch) {
        try{
           const {data}=await authenticatedApi.get("/auth/getauth")
           dispatch(setUser(data.data))
           
          }catch(err){
            console.log(err)
            alert("Error accure")
          }
    }
}
export function UpdateProfile(userData){
    return async function UpdateProfileThunk(dispatch) {
        try{
           const {data}=await authenticatedApi.post("/auth/updateprofile",userData,{
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            }
           })
           dispatch(setUser(data.data))
           
          }catch(err){
            console.log(err)
            alert("Error accure")
          }
    }
}
export function ChangePasswrod(userData){
    return async function ChangePasswrodThunk(dispatch) {
        try{
           const data=await authenticatedApi.post("/auth/changepass",userData,{
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            }
           })
          if(data.status==200){
            dispatch(setConfirm(true))
          }
          }catch(err){
            console.log(err)
            Tostify({status:"error",message:err.response?.data?.message||"Password change failed"});
          }
    }
}
export function handleConfirm(){
    return async function handleConfirmThunk(dispatch) {
        dispatch(setConfirm())
    }
}
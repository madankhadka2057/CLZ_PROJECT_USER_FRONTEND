import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCartItem, RemoveItemFromCart, updateCartItem } from "../../store/cartSlice";

const Cart = () => {
  const navigate =useNavigate()
  const dispatch=useDispatch()
//   useEffect(()=>{
//     dispatch(fetchCartItem())
// },[])
const {cartItem}=useSelector((state)=>state.cart)
const totalPrice=cartItem.reduce((total,cartItem)=>{return total+cartItem.product.price*cartItem.quantity},0)
const pricedetails={
    Subtotal:totalPrice,
    Discount:0.0,
    Tax:0.0,
    Shipping:50.0,
}

const HandleQuantity=(productId,newQuantity)=>{
        newQuantity = Math.max(1, newQuantity);
        dispatch(updateCartItem(productId, newQuantity));
    
}

const HandleRemove=(productId)=>{
    const Id=productId
    dispatch(RemoveItemFromCart(Id))
}
return(
    
  <div className="font-sans md:max-w-7xl max-md:max-w-xl mx-auto  bg-white py-4">
            
            {/* <div className="mt-6 w-10 m-auto">
                <div className="inline-block h-10 w-10 text-blue-500  animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            </div> */}
            {
                cartItem.length?(
                <div className="grid md:grid-cols-3 md:gap-6 lg:gap-32 ">
                    <div className="md:col-span-2 bg-gray-100  rounded-md ">
                        <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
                        <hr className="border-gray-300 mt-4 mb-8" />
                    <div className="px-4 scrollbar-thin overflow-scroll h-[60vh]">
                    {
                        cartItem.length?(cartItem.map((data)=>{
                            return(
                                <div key={data?.product?.id} className="space-y-4 px-4">
                                    <div className="grid grid-cols-3 mt-3 items-center gap-4">
                                        <div className="col-span-2 flex items-center gap-4">
                                            <div className="w-32 h-32 shrink-0   bg-white p-2 rounded-md">
                                                <img src={data?.product?.img} className="w-full h-full rounded-md" />
                                            </div>
            
                                            <div>
                                                <h3 className="text-base font-bold text-gray-800">{data?.product?.pName}</h3>
                                                <h6 onClick={()=>HandleRemove(data?.productId)} className="text-xs text-red-500 cursor-pointer mt-0.5">Remove</h6>
            
                                                <div className="flex gap-4 mt-4">
                                                    <div>
                                                        <button type="button"
                                                            className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                                            <svg onClick={()=>HandleQuantity(data?.product?.id,data?.quantity-1)} min={2} xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124">
                                                                <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                                            </svg>
            
                                                            <span className="mx-2.5">{data?.quantity}</span>
                                                            <svg onClick={()=>HandleQuantity(data?.product?.id,data?.quantity+1)} xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 42 42">
                                                                <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-auto">
                                            <h4 className="text-base font-bold text-gray-800">Rs {data?.product?.price}</h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        })):""
                    }
                    </div>
                    </div>

                    <div className="bg-gray-100 mt-4 md:m-0 rounded-md p-4 md:sticky top-0">
                        {/* <div className="flex border border-blue-600 overflow-hidden rounded-md">
                            <input type="email" placeholder="Promo code"
                                className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5" />
                            <button type='button' className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white">
                                Apply
                            </button>
                        </div> */}

                        <ul className="text-gray-800 mt-8 space-y-4">
                            <li className="flex flex-wrap gap-4 text-base">Discount <span className="ml-auto font-bold">Rs {pricedetails&&pricedetails.Discount}</span></li>
                            <li className="flex flex-wrap gap-4 text-base">Shipping <span className="ml-auto font-bold">Rs {pricedetails&&pricedetails.Shipping}</span></li>
                            <li className="flex flex-wrap gap-4 text-base">Tax <span className="ml-auto font-bold">Rs {pricedetails&&pricedetails.Tax}</span></li>
                            <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">Rs {pricedetails&&pricedetails.Subtotal-pricedetails.Discount+pricedetails.Shipping+pricedetails.Tax}</span></li>
                        </ul>

                        <div className="mt-8 space-y-2">
                            <button onClick={()=>navigate("/Checkout")} type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md">Checkout</button>
                            <button type="button" onClick={()=>navigate('/product')} className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">Continue Shopping  </button>
                        </div>
                    </div>
                </div>):(
                    <h2 className="font-bold text-red-500 text-2xl text-center my-40">Cart is empty Please add some product to the cart</h2>
                )
            }
        </div>
)};

export default Cart;

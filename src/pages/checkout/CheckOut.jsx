import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../../../src/index.css'
import { authenticatedApi } from '../../API/Api'
const CheckOut = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const navigate = useNavigate()
  const { cartItem } = useSelector((state) => state.cart)



  if (cartItem.length === 0) {
    navigate('/cart');
  }

  const CartData = cartItem.map(element => {
    var ProductPrice = element.quantity * element.product.price
    return { ...element, ProductPrice }
  });
  const totalAmount = cartItem.reduce((total, cartItem) => total + cartItem.quantity * cartItem.product.price, 0)
  const pricedetails = {
    Sutotal: totalAmount,
    Discount: 0.0,
    Tax: 0.0,
    Shipping: 50.0,
  }
  const HandlePaymentMethod = (value) => {
    setPaymentMethod(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneNumber = cartItem[0]?.user?.phoneNumber;
    const shippingAddress = "pyuthan-3"; // Replace this with actual address from the form
    const orderStatus = "pending";
    const paymentDetails = {
      paymentMethod: paymentMethod,
    };

    const items = cartItem.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
    let data = {
      phoneNumber,
      shippingAddress,
      totalAmount: pricedetails.Sutotal + pricedetails.Shipping,
      orderStatus,
      paymentDetails,
      items,
    };

    try {
      const response = await authenticatedApi.post('user/order', data);

      if(response.status==200){
        sessionStorage.setItem("toastMessage", JSON.stringify({ status: "success", message: response.data.message }));
      }else{
        sessionStorage.setItem("toastMessage", JSON.stringify({ status: "success", message: response.data.message}));
      }

      if (response.data.payment_url) {
        var pidx=new URL(response.data.payment_url).searchParams.get("pidx")
        console.log(pidx)
        const VerifyResponse = await authenticatedApi.post('user/order/verify', {pidx});
        if(VerifyResponse.status==200){
          window.location.href = response.data.payment_url;
        }
       
      } else {
        window.location.href="http://localhost:5173/home" // Navigate to a confirmation page
      }
    } catch (error) {
      // Handle any errors
      console.error("Error processing payment:", error);
      alert("There was an issue processing your payment. Please try again.");
    }
  }

  return (
    <div className="mt-6 mb-2">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className='px-2 scrollbar-thin overflow-scroll h-[60vh]'>
            {
              CartData.map((data) => {
                return (
                  <div key={data.id} className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 ">
                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                      <img
                        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                        src={data?.product?.img}
                        alt=""
                      />
                      <div className="flex w-full flex-col px-4 py-4">
                        <span className="font-semibold">
                          {data?.product?.pName}
                        </span>
                        <span className="float-right text-gray-400">
                          Quantity: {data?.quantity}
                        </span>
                        <p className="text-lg font-bold">NRP {data?.ProductPrice}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => HandlePaymentMethod(e.target.value)}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-8 object-contain"
                  src="../../..//public/assets/cash-on-delivery.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-4 ml-4 font-semibold">COD(Cash on Delivery)</span>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                value="khalti"
                onChange={(e) => HandlePaymentMethod(e.target.value)}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="public/assets/Khalti_Digital_Wallet_Logo.png.jpg"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-4 font-semibold">Khalti Payment(only)</span>
                </div>
              </label>
            </div>
          </form>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <div className="">
              <label
                htmlFor="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={cartItem[0]?.user?.email}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                  disabled
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="phoneNumber"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={cartItem[0]?.user?.phoneNumber}
                  className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+97798xxxxxxxx"
                  disabled
                />
              </div>
              <label
                htmlFor="shippingAddress"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Billing Address
              </label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="shippingAddress"
                    name="shippingAddress"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Street Address"
                    value="pyuthan-3"
                    disabled
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img
                      className="h-4 w-4 object-contain"
                      src="Flag_of_Nepal.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">NRP {pricedetails.Sutotal}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">NRP {pricedetails.Shipping}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">NRP {pricedetails.Sutotal + pricedetails.Shipping}</p>
              </div>
            </div>
            {paymentMethod === "cod" ?

              <button className="mt-4 mb-8 w-full rounded-md bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700" >
                Place Order
              </button> :
              <button className={`mt-4 mb-8 w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700`}>
                Payment With Khalti
              </button>
            }

          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckOut
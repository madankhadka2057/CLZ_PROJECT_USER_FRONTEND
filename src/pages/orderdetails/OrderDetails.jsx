import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { cancleOrder, fetchOrderDetails } from '../../store/OrderSlice'

function OrderDetails() {
    const params = useParams
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = params()
    useEffect(() => {
        dispatch(fetchOrderDetails(id))
    }, [])
    const { data } = useSelector((state) => state.order)
    const dateObject = new Date(data[0]?.order?.createdAt);
    const date=dateObject.toLocaleString()
    
        
    
    const handleCancleOrder = () => {
        if((data[0]?.order?.orderStatus!="cancelled")){
            dispatch(cancleOrder(id))
        }
    }

    return (
        <div>
            {data.length > 0 ? (

                <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container m-auto 2xl:mx-auto">
                    <div className="flex justify-start item-start space-y-2 flex-col">
                        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order Id:- {id}</h1>
                        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">Today:- {new Date().toLocaleString()} </p>
                    </div>
                    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch lg:m-auto lg:w-[80vw] xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
                                {
                                    data.map((order) => {
                                        return (
                                            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                                <div className="pb-4 md:pb-8 w-full md:w-28">
                                                    <img className="w-full hidden md:block" src={order?.product?.img} alt="dress" />
                                                    <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
                                                </div>
                                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{order?.product?.pName}</h3>
                                                        {/* <div className="flex justify-start items-start flex-col space-y-2">
                                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Style: </span> Italic Minimal Design</p>
                                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Size: </span> Small</p>
                                                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Color: </span> Light Blue</p>
                                                        </div> */}
                                                    </div>
                                                    <div className="flex justify-between space-x-8 items-start w-full">
                                                        <p className="text-base dark:text-white xl:text-lg leading-6">Rs.{order?.product?.price}</p>
                                                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{order?.quantity}</p>
                                                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs. {order?.product?.price * order?.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                        <div className="flex justify-between w-full">
                                            <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Rs. {data[0]?.order?.totalAmount}</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                                            <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Rs. 50</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                        <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{parseFloat(data[0]?.order?.totalAmount) + 50.00}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex justify-center items-center space-x-4">
                                            <div className="w-8 h-8">
                                                <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                            </div>
                                            <div className="flex flex-col justify-start items-center">
                                                <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800"><span className="font-normal">Delivery within 1 Hours</span></p>
                                            </div>


                                        </div>
                                        <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">Rs. 50</p>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start  px-4 py-6 md:p-6 xl:p-8 flex-col">
                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
                            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                <div className="flex flex-col justify-start items-start flex-shrink-0">
                                    <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                        <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                                        <div className="flex justify-start items-start flex-col space-y-2">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{data[0]?.order?.user?.userName}</p>
                                            <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">{data[0]?.order?.user?.phoneNumber}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="cursor-pointer text-sm leading-5 ">{data[0]?.order?.user.email}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-col items-center md:items-start">
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Shipping Address</p>
                                            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{data[0]?.order?.shippingAddress}</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Order Date</p>
                                            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{date}</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Order Status</p>
                                            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{data[0]?.order?.orderStatus}</p>
                                        </div>
                                        <div class="flex w-full justify-center items-center md:justify-start md:items-start">
                                            <button onClick={handleCancleOrder} class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-800  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 bg-black  w-96 2xl:w-full text-base font-medium leading-4 text-white">Cancel Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                navigate('/myorder')
            )}
        </div>
    )
}

export default OrderDetails
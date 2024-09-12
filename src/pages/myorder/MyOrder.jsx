import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyOrder, fetchOrder } from '../../store/OrderSlice';
import { useNavigate } from 'react-router-dom';
const MyOrder = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    useEffect(() => {
        dispatch(fetchOrder())
    }, [])
    const { data } = useSelector((state) => state.order)
    const handleDelete=(id)=>{
       dispatch(deleteMyOrder(id))
    }
    return (
        <div>
            {data?.length>0?(

            <table className="min-w-[90%] m-auto mt-5 mb-36 border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">S.N</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">OrderId</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Total Amount</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Order Status</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Payment Method</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Payment Status</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {
                        data?.map((data, index) => {
                            return (
                                <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">S.N</span>{index + 1}</td>
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">OrderId</span><a classNameName='text-blue-600'>{data.id}</a></td>
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Total Amount</span>{data?.totalAmount}</td>
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Order Status</span>{data?.orderStatus}</td>
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Payment Method</span>{data?.payment?.paymentMethod}</td>
                                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Payment Status</span>{data?.payment?.paymentStatus}</td>
                                    <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell ">
                                        <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                                        <button onClick={()=>navigate(`/orderdetails/${data.id}`)} className="bg-blue-500 mx-2 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">Edit</button>
                                        <button onClick={()=>handleDelete(data?.id)} className="bg-red-500 mx-2 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            ):(
                <div className='text-center text-gray-600 my-40'>
                    <h1 className='text-red-500 text-2xl font-bold'>You haven't ordered yet</h1>
                </div>
            )}
        </div>
    )
}

export default MyOrder
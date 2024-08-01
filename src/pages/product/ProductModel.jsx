import { useRef } from "react"
import { useDispatch } from "react-redux"
import { setCartItem } from "../../store/cartSlice"


const ProductModel = ({ product, onClose }) => {
    const dispatch=useDispatch()
    const { productId, data } = product
    const [newData] = data.filter((data) => { return data.id == productId })
    const refEl = useRef()
    const handleClose = (e) => {
        if (e.target == refEl.current) {
            onClose()
        }
    }
    const handleCart = (productId) => {
        dispatch(setCartItem(productId))
      }
    return (
        <div ref={refEl} onClick={handleClose} id="authentication-modal" tabIndex="-1" aria-hidden="true" className="  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className=" m-auto  relative  p-4  size-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white m-auto w-full top-20 rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex  items-center  justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Product Details
                        </h3>
                        <button onClick={onClose} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className=" grid  relative grid-cols-1 gap-6 sm:grid-cols-1 w-full sm:gap-4 ">
                        <div className="relative flex flex-col items-center overflow-hidden border-t-0 border">
                            <div className="aspect-square relative overflow-hidden">
                                <img className="h-56 w-56 cursor-pointer object-cover transition-all duration-300 group-hover:scale-125" src={newData.img} alt="" />
                            </div>
                            <div className="absolute top-0 left-0 m-2 rounded-full bg-white">
                                <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
                            </div>
                            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                                <div className="mb-2 flex">
                                    <p className="mr-3 text-sm font-semibold">Rs {newData.price}</p>
                                    <del className="text-xs text-gray-400"> Rs 79.00 </del>
                                </div>
                                <h3 className="mb-2 text-sm font-bold text-gray-800">{newData.pName}</h3>
                                <p className="mb-2 text-sm text-gray-800">{newData.discription}</p>
                            </div>
                            <button onClick={() => { handleCart(newData.id) }} className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                                <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">Add</div>
                                <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-emerald-500 group-hover:text-white">+</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModel
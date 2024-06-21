import { useEffect, useState } from "react"
import { fetchProduct } from "../../store/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { setCartItem } from "../../store/cartSlice"
function Product() {
  const dispatch = useDispatch()
  const [isModelOpen, setModelOpen] = useState(true)
 
  useEffect(() => {
    dispatch(fetchProduct())
  }, [])
  const { data } = useSelector((state) => state.product)
  const closeModel = () => {
    setModelOpen(true)
  }
  const openModel = () => {
    setModelOpen(false)
  }

  const handleCart=(productId)=>{
    dispatch(setCartItem(productId))
  }
   

  return (
    <>


      <section className="bg-white py-12  text-gray-700 sm:py-16 lg:py-20 ">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Fresh Fruits & Vegetables</h2>
          </div>

          <div className="mt-10 grid relative grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">

            {
              data.map((product) => {
                return (

                  <article key={product.id} className="relative flex flex-col items-center overflow-hidden rounded-lg border">
                    <div className="aspect-square relative overflow-hidden">
                      <img onClick={openModel} className="h-56 w-56 cursor-pointer object-cover transition-all duration-300 group-hover:scale-125" src={product.img} alt="" />
                    </div>
                    <div className="absolute top-0 left-0 m-2 rounded-full bg-white">
                      <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">Sale</p>
                    </div>
                    <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                      <div className="mb-2 flex">
                        <p className="mr-3 text-sm font-semibold">Rs {product.price}</p>
                        <del className="text-xs text-gray-400"> Rs 79.00 </del>
                      </div>
                      <h3 className="mb-2 text-sm text-gray-400">{product.pName}</h3>
                    </div>
                    <button className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                      <div onClick={()=>{handleCart(product.id)}} className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">Add</div>
                      <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-emerald-500 group-hover:text-white">+</div>
                    </button>
                  </article>
                )
              })
            }
            <div
              role="alert"
              className={` ${isModelOpen?"hidden":"absolute"}  md:left-40 mx-auto max-w-lg rounded-lg border border-stone bg-stone-100 p-4 shadow-lg sm:p-6 lg:p-8`}
            >
              <div className="flex items-center gap-4">
                <span className="shrink-0 rounded-full bg-emerald-400 p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>

                <p className="font-medium sm:text-lg text-emerald-600">New notification!</p>
              </div>

              <p className="mt-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore?
              </p>

              <div className="mt-6 sm:flex sm:gap-4">
                <a
                  href="#"
                  className="inline-block w-full rounded-lg bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
                >
                  View
                </a>

                <a
                  onClick={closeModel}
                  className="mt-2 inline-block w-full rounded-lg bg-stone-300 px-5 py-3 text-center text-sm font-semibold text-gray-800 sm:mt-0 sm:w-auto"
                >
                  Dismiss
                </a>
              </div>
            </div>
          </div>
          {/* <div id="hs-full-screen-modal-below-md " onClick={closeModel} className={`hs-overlay  ${isModelOpen ? "hidden" : " absolute "} m-auto absolute w-full  size-1/2    top-40 start-1 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none`}>
            <div className=" hs-overlay-open:mt-0  hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-10 transition-all max-w-full max-h-full h-full md:hs-overlay-open:mt-10 md:mt-0 md:max-w-lg md:max-h-none md:h-auto md:mx-auto">
              <div className="flex flex-col  bg-gray-300/100 pointer-events-auto max-w-full max-h-full h-full md:max-w-lg md:max-h-none md:h-auto md:border md:rounded-xl md:shadow-sm dark:bg-neutral-800 md:dark:border-neutral-700">
                <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                  <h3 className="font-bold text-gray-800  dark:text-white">
                    Modal title
                  </h3>
                  <button type="button" onClick={closeModel} className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700" data-hs-overlay="#hs-full-screen-modal-below-md">
                    <span className="sr-only">Close</span>
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
                <div className="p-4 overflow-y-auto">
                  <p className="mt-1 text-gray-800 dark:text-neutral-400">
                    This is a wider card with supporting text below as a natural lead-in to additional content.
                  </p>
                </div>
                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t mt-auto md:mt-0 dark:border-neutral-700">
                  <button type="button" onClick={closeModel} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" data-hs-overlay="#hs-full-screen-modal-below-md">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>

      </section>
    </>

  )
}

export default Product
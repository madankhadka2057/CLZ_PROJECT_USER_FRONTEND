import { useEffect, useState } from "react"
import { fetchProduct, setProduct } from "../../store/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { setCartItem } from "../../store/cartSlice"
import ProductModel from "./ProductModel"
import Tostify from "../../global/Toastify/Tostify"
import { useNavigate } from "react-router-dom"
function Product() {
  const dispatch = useDispatch()
  const [toggleModal, setToggleModal] = useState(false)
  const [productId, setProductId] = useState('')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  console.log(token)
  const closeModal = () => {
    setToggleModal(false)
  }

  useEffect(() => {
    dispatch(fetchProduct())
  }, [])
  const { data } = useSelector((state) => state.product)

  const handleCart = (productId) => {
    if (!token) {
      navigate('/login')
    } else {
      dispatch(setCartItem(productId))
    }

  }
  const handleModalOpen = (id) => {
    setProductId(id)
    setToggleModal(true)

  }
  return (
    <>

      <section className=" py-12  text-gray-700 sm:py-16 lg:py-20 ">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Fresh Foods</h2>
          </div>

          <div className="mt-10 grid relative grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">

            {
              data ? data.map((product) => {
                return (
                  <article key={product.id} className="relative flex flex-col items-center overflow-hidden rounded-lg border">
                    <div onClick={() => handleModalOpen(product.id)} className="aspect-square relative overflow-hidden">
                      <img className="h-full w-full rounded-md cursor-pointer  transition-all duration-300 group-hover:scale-125" src={product.img} alt="" />
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
                      <div onClick={() => { handleCart(product.id) }} className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">Add</div>
                      <div onClick={() => { handleCart(product.id) }} className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-emerald-500 group-hover:text-white">+</div>
                    </button>
                  </article>
                )
              }) : (
                <h2 className="font-bold text-red-500 text-2xl">Product is not added yet</h2>
              )
            }
            {toggleModal ? <ProductModel product={{ data, productId }} onClose={closeModal} /> : ""}
          </div>
        </div>
      </section>
    </>

  )
}

export default Product
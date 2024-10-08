import { useEffect, useState } from "react"

const ScrollBtn = () => {
    const [isScrollBtn,setScrollBtn]=useState(false)
    useEffect(()=>{
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setScrollBtn(true);
            } else {
                setScrollBtn(false);
            }
        });
    },[])
    // console.log(window.scrollY)
    const handleTop=()=>{
        window.scrollTo({top:0,behavior:"smooth"})
    }
   
    return (
        <button
            type="button"
            onClick={()=>handleTop()}
            data-twe-ripple-init
            data-twe-ripple-color="light"
            className={`!fixed bottom-5 end-5 z-50  ${isScrollBtn?" ":"hidden"} rounded-full bg-blue-800 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg`}
            id="btn-back-to-top">
            <span className="[&>svg]:w-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
            </span>
        </button>
    )
}
export default ScrollBtn
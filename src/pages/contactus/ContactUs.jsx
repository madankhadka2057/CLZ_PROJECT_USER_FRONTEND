import { useForm } from "react-hook-form"
import { authenticatedApi } from "../../API/Api"
import axios from "axios"
import { useEffect, useState } from "react"

const ContactUs = () => {
  const { handleSubmit, register, reset,watch, formState: { errors } } = useForm()
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const watchAllFields = watch();

    useEffect(() => {
      // console.log(errors?.number?.ref?.attributes)
        const allFieldsFilled = watchAllFields.name && watchAllFields.email && watchAllFields.number && watchAllFields.message;
        const noErrors = !errors.name && !errors.email && !errors.number && !errors.message;
        setIsButtonEnabled(allFieldsFilled && noErrors);
    }, [watchAllFields, errors]);

  const formSubmit = async (data) => {
    reset()
    const response = await authenticatedApi.post('user/contact', data).then(()=>{
      alert("Message sent successfully")
    }).catch((error)=>{
      alert("Something went wrong please try again")
    })

  }

  return (
    <div id="contactus" className="  font-[sans-serif] max-w-6xl
     mx-auto relative bg-white rounded-lg md:py-6">
      <div className="relative w-full text-center flex justify-center items-center ">
        <h2 className="lg:text-4xl md:text-3xl text-xl w-full font-bold text-gray-900 leading-[3.25rem] dark:text-white lg:mb-6 mx-auto max-w-max  lg:mx-0">Stay connect to with us</h2>
      </div>
      <div className="grid lg:grid-cols-3 items-center">
        <div className="grid sm:grid-cols-2 gap-4  relative lg:left-16 max-lg:px-4">
          <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 fill-blue-600" viewBox="0 0 512 512">
              <path d="M341.476 338.285c54.483-85.493 47.634-74.827 49.204-77.056C410.516 233.251 421 200.322 421 166 421 74.98 347.139 0 256 0 165.158 0 91 74.832 91 166c0 34.3 10.704 68.091 31.19 96.446l48.332 75.84C118.847 346.227 31 369.892 31 422c0 18.995 12.398 46.065 71.462 67.159C143.704 503.888 198.231 512 256 512c108.025 0 225-30.472 225-90 0-52.117-87.744-75.757-139.524-83.715zm-194.227-92.34a15.57 15.57 0 0 0-.517-.758C129.685 221.735 121 193.941 121 166c0-75.018 60.406-136 135-136 74.439 0 135 61.009 135 136 0 27.986-8.521 54.837-24.646 77.671-1.445 1.906 6.094-9.806-110.354 172.918L147.249 245.945zM256 482c-117.994 0-195-34.683-195-60 0-17.016 39.568-44.995 127.248-55.901l55.102 86.463a14.998 14.998 0 0 0 25.298 0l55.101-86.463C411.431 377.005 451 404.984 451 422c0 25.102-76.313 60-195 60z" data-original="#000000"></path>
              <path d="M256 91c-41.355 0-75 33.645-75 75s33.645 75 75 75 75-33.645 75-75-33.645-75-75-75zm0 120c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45z" data-original="#000000"></path>
            </svg>
            <h4 className="text-gray-800 text-base font-bold mt-4">Visit office</h4>
            <p className="text-sm text-gray-600 mt-2"> Butwal sub-metropolition-3,golpark</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 fill-blue-600" viewBox="0 0 473.806 473.806">
              <path d="M374.456 293.506c-9.7-10.1-21.4-15.5-33.8-15.5-12.3 0-24.1 5.3-34.2 15.4l-31.6 31.5c-2.6-1.4-5.2-2.7-7.7-4-3.6-1.8-7-3.5-9.9-5.3-29.6-18.8-56.5-43.3-82.3-75-12.5-15.8-20.9-29.1-27-42.6 8.2-7.5 15.8-15.3 23.2-22.8 2.8-2.8 5.6-5.7 8.4-8.5 21-21 21-48.2 0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5-6-6.2-12.3-12.6-18.8-18.6-9.7-9.6-21.3-14.7-33.5-14.7s-24 5.1-34 14.7l-.2.2-34 34.3c-12.8 12.8-20.1 28.4-21.7 46.5-2.4 29.2 6.2 56.4 12.8 74.2 16.2 43.7 40.4 84.2 76.5 127.6 43.8 52.3 96.5 93.6 156.7 122.7 23 10.9 53.7 23.8 88 26 2.1.1 4.3.2 6.3.2 23.1 0 42.5-8.3 57.7-24.8.1-.2.3-.3.4-.5 5.2-6.3 11.2-12 17.5-18.1 4.3-4.1 8.7-8.4 13-12.9 9.9-10.3 15.1-22.3 15.1-34.6 0-12.4-5.3-24.3-15.4-34.3l-54.9-55.1zm35.8 105.3c-.1 0-.1.1 0 0-3.9 4.2-7.9 8-12.2 12.2-6.5 6.2-13.1 12.7-19.3 20-10.1 10.8-22 15.9-37.6 15.9-1.5 0-3.1 0-4.6-.1-29.7-1.9-57.3-13.5-78-23.4-56.6-27.4-106.3-66.3-147.6-115.6-34.1-41.1-56.9-79.1-72-119.9-9.3-24.9-12.7-44.3-11.2-62.6 1-11.7 5.5-21.4 13.8-29.7l34.1-34.1c4.9-4.6 10.1-7.1 15.2-7.1 6.3 0 11.4 3.8 14.6 7l.3.3c6.1 5.7 11.9 11.6 18 17.9 3.1 3.2 6.3 6.4 9.5 9.7l27.3 27.3c10.6 10.6 10.6 20.4 0 31-2.9 2.9-5.7 5.8-8.6 8.6-8.4 8.6-16.4 16.6-25.1 24.4-.2.2-.4.3-.5.5-8.6 8.6-7 17-5.2 22.7l.3.9c7.1 17.2 17.1 33.4 32.3 52.7l.1.1c27.6 34 56.7 60.5 88.8 80.8 4.1 2.6 8.3 4.7 12.3 6.7 3.6 1.8 7 3.5 9.9 5.3.4.2.8.5 1.2.7 3.4 1.7 6.6 2.5 9.9 2.5 8.3 0 13.5-5.2 15.2-6.9l34.2-34.2c3.4-3.4 8.8-7.5 15.1-7.5 6.2 0 11.3 3.9 14.4 7.3l.2.2 55.1 55.1c10.3 10.2 10.3 20.7.1 31.3zm-154.2-286.1c26.2 4.4 50 16.8 69 35.8s31.3 42.8 35.8 69c1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.4-1.2 12.3-8.2 11.1-15.6-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3 3.7-15.6 11s3.5 14.4 10.9 15.6zm217.2 96.3c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2 3.7-15.5 11-1.2 7.4 3.7 14.3 11.1 15.6 46.6 7.9 89.1 30 122.9 63.7 33.8 33.8 55.8 76.3 63.7 122.9 1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.3-1.1 12.3-8.1 11-15.4z" data-original="#000000"></path>
            </svg>
            <h4 className="text-gray-800 text-base font-bold mt-4">Call us</h4>
            <p className="text-sm text-gray-600 mt-2">9779867365986</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 fill-blue-600"
              viewBox="0 0 479.058 479.058">
              <path
                d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                data-original="#000000" />
            </svg>
            <h4 className="text-gray-800 text-base font-bold mt-4">Gmail us</h4>
            <p className="text-sm text-gray-600  mt-2">madankhadka2057@
              gmail.com</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 fill-blue-400" viewBox="0 0 512 512">
              <path
                d="M256.064 0h-.128C114.784 0 0 114.816 0 256c0 56 18.048 107.904 48.736 150.048l-31.904 95.104 98.4-31.456C155.712 496.512 204 512 256.064 512 397.216 512 512 397.152 512 256S397.216 0 256.064 0z"
                data-original="#000000" />
              <path fill="#f0f7f0"
                d="M405.024 361.504c-6.176 17.44-30.688 31.904-50.24 36.128-13.376 2.848-30.848 5.12-89.664-19.264-75.232-31.168-123.68-107.616-127.456-112.576-3.616-4.96-30.4-40.48-30.4-77.216s18.656-54.624 26.176-62.304c6.176-6.304 16.384-9.184 26.176-9.184 3.168 0 6.016.16 8.576.288 7.52.32 11.296.768 16.256 12.64 6.176 14.88 21.216 51.616 23.008 55.392 1.824 3.776 3.648 8.896 1.088 13.856-2.4 5.12-4.512 7.392-8.288 11.744-3.776 4.352-7.36 7.68-11.136 12.352-3.456 4.064-7.36 8.416-3.008 15.936 4.352 7.36 19.392 31.904 41.536 51.616 28.576 25.44 51.744 33.568 60.032 37.024 6.176 2.56 13.536 1.952 18.048-2.848 5.728-6.176 12.8-16.416 20-26.496 5.12-7.232 11.584-8.128 18.368-5.568 6.912 2.4 43.488 20.48 51.008 24.224 7.52 3.776 12.48 5.568 14.304 8.736 1.792 3.168 1.792 18.048-4.384 35.52z"
                data-original="#fafafa" />
            </svg>
            <h4 className="text-gray-800 text-base font-bold mt-4">WhatsApp</h4>
            <p className="text-sm text-gray-600 mt-2">9867365986</p>
          </div>
        </div>
        {/* bg-[#0a4275] */}
        <div className="lg:col-span-2 bg-[#293548] rounded-lg sm:p-10 p-4  max-lg:-order-1 max-lg:mb-8">
          <h2 className="text-3xl text-white text-center font-bold mb-6">Contact us</h2>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="max-w-md mx-auto space-y-3">
              <input type='text' placeholder='Name'
                className={`w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none ${errors?.name ? ' border-2 border-red-600 border-solid' : ''}`}
                {...register("name", {
                  required: "Please Enter your name",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long"
                  }, maxLength: {
                    value: 25
                  },
                  pattern: {
                    value: /^[A-Za-z\s]*$/i,
                    message: "Name must only contain letters"
                  }
                })
                }
               
              />
              {errors?.name && (
                <p className="text-xs text-red-500 flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {errors.name.message}
                </p>
              )}

              <input type='email' placeholder='Email'
                className={`w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none ${errors?.email ? ' border-2 border-red-600 border-solid' : ''}`}
                {...register("email", {
                  required:'Please enter your email',
                  pattern:{
                    value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message:"Invalid email partten "
                  }
                  
                })

                }
                
              />
              {errors?.email && (
                <p className="text-xs text-red-500 flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
              <input type='number' placeholder='Phone No.'
                className={`w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none ${errors?.number ? ' border-2 border-red-600 border-solid' : ''}`}
                {...register("number", {
                  required: 'Please enter your number',
                  minLength: {
                    value: 10,
                    message: "Phone number contain atleast 10 digits"
                  },
                  maxLength: {
                    value: 14,
                    message: "Phone number is too long"
                  }
                })

                }
                
              />
              {errors?.number && (
                <p className="text-xs text-red-500 flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {errors.number.message}
                </p>
              )}
              <textarea placeholder='Message' rows="6"
                className={`w-full bg-gray-100 rounded-lg px-6 text-sm pt-3 outline-none ${errors?.message ? ' border-2 border-red-600 border-solid' : ''}`}
                {
                ...register("message", {
                  required: "Message cann't be empty",
                  minLength: {
                    value: 5,
                    message: "Atleast 5 digit required"
                  },
                  maxLength: {
                    value: 100,
                    message: "Message cann't contain more the 100 digit"
                  }
                })
                }
              
              />
              {errors?.message && (
                <p className="text-xs text-red-500 flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {errors.message.message}
                </p>
              )}

              <button type='submit' disabled={!isButtonEnabled}
                className={`text-gray-800 w-full relative bg-yellow-400 ${!isButtonEnabled ? 'bg-[#8d9121] cursor-not-allowed' : ''} hover:bg-yellow-500 font-semibold rounded-lg text-sm px-6 py-3 !mt-6`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='currentColor' className="mr-2 inline" viewBox="0 0 548.244 548.244">
                  <path fillRule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clipRule="evenodd" data-original="#000000" />
                </svg>
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
import { useForm } from "react-hook-form"

const Register = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    return (
        <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
            <div className="text-center mb-16">
                <a href="javascript:void(0)"><img
                    src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-52 inline-block' />
                </a>
                <h4 className="text-gray-800 text-base font-semibold mt-6">Sign up into your account</h4>
            </div>

            <form>
                <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
                        <input name="name" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name"
                            {...register("userName", {
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
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                        <input name="email" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email"
                            {...register("email", {
                                required: 'Please enter your email',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email partten "
                                }

                            })

                            }
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Mobile No.</label>
                        <input name="number" type="number" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number"
                            {...register("phoneNumber", {
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
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Password</label>
                        <input name="password" type="password" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
                        <ul className="mt-2 px-4 grid sm:grid-cols-2 gap-y-1 gap-x-6 w-max list-disc">
                            <li className="text-xs text-orange-500">minimum 8 characters</li>
                            <li className="text-xs text-orange-500">one uppercase characters</li>
                            <li className="text-xs text-orange-500">one special characters</li>
                            <li className="text-xs text-orange-500">one number</li>
                        </ul>
                    </div>
                </div>

                <div className="!mt-12  ">
                    <button type="button" className="py-3.5 px-7  text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register
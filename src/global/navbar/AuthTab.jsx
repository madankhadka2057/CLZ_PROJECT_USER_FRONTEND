import React, { useEffect } from 'react'
import 'flowbite'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { ChangePasswrod, UpdateProfile } from '../../store/authSlice'
import Confirm from '../confirm_dailog/Confirm'
import ChangePass from './ChangePass'
function AuthTab() {
    const dispatch = useDispatch()
    //fetching data from authSlice!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const { data } = useSelector((state) => state.auth)
    //handle profile update with react-hook-form!!!!!!!!!!!!!!!!!!!!!!!
    const { handleSubmit, register, formState: { errors }, watch, reset } = useForm()
    useEffect(() => {
        reset({
            userName: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber
        })
    }, [data])
    const handleProfile = (data) => {
        dispatch(UpdateProfile(data))
    }

    return (
        <div class="max-w-2xl mx-auto">
            <div class="border-b my-10 border-gray-200 dark:border-gray-700 mb-4">
                <ul class="flex flex-wrap py-2 -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                    <li class="mr-8" role="presentation">
                        <button class="flex justify-center font-bold cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none transition-all duration-500 ease-in-out" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">Profile View</button>
                    </li>
                    <li class="mr-8" role="presentation">
                        <button class="flex justify-center font-bold cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none transition-all duration-500 ease-in-out" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Profile Edit</button>
                    </li>
                    <li class="mr-8" role="presentation">
                        <button class="flex justify-center font-bold cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none transition-all duration-500 ease-in-out" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Change Password</button>
                    </li>

                </ul>
            </div>
            <div id="myTabContent">
                <div class="h-[70vh] bg-gray-50 p-4 rounded-lg dark:bg-gray-800 hidden" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                    <div class="bg-white overflow-hidden shadow rounded-lg border">
                        <div class="px-4 py-5 sm:px-6">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                User Profile
                            </h3>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                This is some information about the user.
                            </p>
                        </div>
                        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <div class="sm:divide-y sm:divide-gray-200">
                                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <div class="text-sm font-medium text-gray-500">
                                        Full name
                                    </div>
                                    <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {data?.userName}
                                    </div>
                                </div>
                                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <div class="text-sm font-medium text-gray-500">
                                        Email Address
                                    </div>
                                    <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {data?.email}
                                    </div>
                                </div>
                                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <div class="text-sm font-medium text-gray-500">
                                        Phone number
                                    </div>
                                    <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {data?.phoneNumber}
                                    </div>
                                </div>
                                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <div class="text-sm font-medium text-gray-500">
                                        Address
                                    </div>
                                    <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {data?.Address || "Pyuthan-3"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="h-[70vh] bg-gray-50 p-4 rounded-lg dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                    <div class="bg-white  border-4 rounded-lg shadow relative ">
                        <div class="flex items-start justify-between p-5 border-b rounded-t">
                            <h3 class="text-xl font-semibold">
                                Edit Profile
                            </h3>

                        </div>
                        <div class="p-6 space-y-6">
                            <form onSubmit={handleSubmit(handleProfile)}>
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="puserName" class="text-sm font-medium text-gray-900 block mb-2">Full Name</label>
                                        <input type="text" name="userName" id="userName" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Full name" required=""
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
                                        {
                                            errors.userName && (<p className="text-xs text-red-500 flex items-center mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {errors.userName.message}
                                            </p>)
                                        }
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="email" class="text-sm font-medium text-gray-900 block mb-2">Email</label>
                                        <input type="text" name="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Email" required=""
                                            {...register("email", {
                                                required: 'Please enter your email',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                    message: "Invalid email partten "
                                                }

                                            })

                                            }
                                        />
                                        {
                                            errors.email && (<p className="text-xs text-red-500 flex items-center mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {errors.email.message}
                                            </p>)
                                        }
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="phoneNumber" class="text-sm font-medium text-gray-900 block mb-2">Phone Numer</label>
                                        <input type="text" name="phoneNumber" id="phoneNumber" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Phone Number" required=""
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
                                        {
                                            errors.phoneNumber && (<p className="text-xs text-red-500 flex items-center mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {errors.phoneNumber.message}
                                            </p>)
                                        }
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="address" class="text-sm font-medium text-gray-900 block mb-2">Address</label>
                                        <input type="text" disabled value={"Pyuthan-3"} name="address" id="address" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Address" required="" />
                                    </div>
                                </div>
                                <div class="p-6 border-t border-gray-200 rounded-b">
                                    <button class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="h-[80vh] bg-gray-50 p-2 rounded-lg dark:bg-gray-800 hidden" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                    <ChangePass/>
                </div>
            </div>
           <Confirm/>
        </div>
    )
}

export default AuthTab
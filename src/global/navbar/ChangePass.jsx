import React, { useState } from 'react'
import { ChangePasswrod } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const ChangePass = () => {
    const dispatch = useDispatch()
    const { handleSubmit, register, formState: { errors }, watch, reset } = useForm()
    const newPassword = watch('newPassword');
    const handlePassChange = (data) => {
        const newData = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword
        }
        dispatch(ChangePasswrod(newData))
    }
    const HandleClear = () => {
        reset()
    }

    const [newPassVisible, setNewPassVisible] = useState(true)
    const [currPassVisible, setCurrPassVisible] = useState(true)
    const [conPassVisible, setConPassVisible] = useState(true)
    return (
        <div class="bg-white flex   justify-center w-full h-screen">
            <div class="bg-white px-4 rounded-lg shadow-lg  w-full">
                <div class="flex items-center  mb-4">
                    <h1 class="text-xl font-semibold">Change Password</h1>
                </div>
                <p class="text-sm text-gray-600 mb-4">Update password for enhanced account security.</p>
                <form onSubmit={handleSubmit(handlePassChange)} id="changePasswordForm">
                    <div className='relative '>
                        <label for="currentPassword" class="text-sm font-medium text-gray-700 block mb-2">Current Password *</label>
                        <input type={`${currPassVisible ? "password" : "text"}`}  id="currentPassword" class="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm" required
                            {...register("currentPassword", { required: 'Please enter your current password' })}
                        />
                        <button type="button" class="absolute right-2 bottom-2 bg-transparent flex items-center justify-center hover:text-blue-600" >
                            {currPassVisible? (<svg onClick={() => setCurrPassVisible(false)} class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>)
                                : (<svg onClick={() => setCurrPassVisible(true)} class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>)
                            }
                        </button>
                    </div>
                        {
                            errors.currentPassword && (<p className="text-xs text-red-500 flex items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {errors.currentPassword.message}
                            </p>)
                        }
                    <div className='relative h-50'>
                        <label for="newPassword" class="text-sm font-medium text-gray-700 block mb-2">New Password *</label>
                        <input type={`${newPassVisible ? "password" : "text"}`} id="newPassword" class="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm" required
                            {...register("newPassword", {
                                required: 'Please enter your new password',
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character'
                                }
                            })}
                        />
                        <button type="button" class="absolute right-2 bottom-2 bg-transparent flex items-center justify-center hover:text-blue-600" >

                            {newPassVisible ? (<svg onClick={() => setNewPassVisible(false)} class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>)
                                : (<svg onClick={() => setNewPassVisible(true)} class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>)
                            }
                        </button>
                    </div>
                        {
                            errors.newPassword && (<p className="text-xs text-red-500 flex items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {errors.newPassword.message}
                            </p>)
                        }
                    <div className='relative'>
                        <label for="confirmPassword" class="text-sm font-medium text-gray-700 block mb-2">Confirm New Password *</label>
                        <input type={`${conPassVisible ? "password" : "text"}`} id="confirmPassword" class="password-input form-input block border w-full border-gray-300 rounded-md shadow-sm" required
                            {...register("confirmPassword", {
                                required: 'Please enter your confirm password',
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character'
                                },
                                validate: (value) =>
                                    value === newPassword || 'Passwords do not match'

                            })}
                        />
                        <button type="button" class="absolute right-2 bottom-3 bg-transparent flex items-center justify-center hover:text-blue-600" >

                            {conPassVisible ? (<svg onClick={() => setConPassVisible(false)} class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>)
                                : (<svg onClick={() => setConPassVisible(true)} class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>)
                            }
                        </button>
                    </div>
                        {
                            errors.confirmPassword && (<p className="text-xs text-red-500 flex items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {errors.confirmPassword.message}
                            </p>)
                        }
                        <button onClick={HandleClear} type="button" class="text-xs text-blue-600 hover:underline mt-1">Clear</button>
                    
                    <div class="flex justify-center">
                        <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">Apply Changes</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default ChangePass
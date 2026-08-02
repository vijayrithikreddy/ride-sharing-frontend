import React from 'react'
import { FaArrowRight, FaMotorcycle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface WelcomeProps {
    setStep: React.Dispatch<React.SetStateAction<String>>;
}

function WelcomeCard({setStep} : WelcomeProps) {
    const navigate = useNavigate();
  return (
    
                <div className="absolute top-10 left-10 w-[400px]">

                    <div className="bg-white rounded-3xl shadow-2xl p-8">

                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

                            <FaMotorcycle
                                size={30}
                                className="text-blue-600"
                            />

                        </div>

                        <h1 className="text-3xl font-bold mt-6">

                            Hello Vijay 👋

                        </h1>

                        <p className="text-gray-500 mt-4 leading-7">

                            Ready to share your ride today?

                            Publish your ride and help students
                            travelling on the same route.

                        </p>

                        <button

                            onClick={() => setStep("publish")}

                            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex justify-center items-center gap-3 font-semibold"

                        >

                            Publish Ride

                            <FaArrowRight />

                        </button>

                    </div>

                </div>
  )
}

export default WelcomeCard

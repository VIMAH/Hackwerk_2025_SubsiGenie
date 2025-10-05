'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function FinalConfirm() {
    const [isChecking, setIsChecking] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleCheck = async () => {
        setIsChecking(true)
        // Simulate checking process
        setTimeout(() => {
            // Redirect back to previous step
            window.location.href = '/budget'
        }, 2000)
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        // Simulate submission process
        setTimeout(() => {
            // Redirect to submitting page
            window.location.href = '/submitting'
        }, 2000)
    }

    return (
        <div className="w-[390px] h-[844px] mx-auto bg-[#F5F5F6] rounded-[40px] relative overflow-hidden">
            {/* Background Gradient Ellipses */}
            <div className="absolute w-[801.34px] h-[1121.14px] -left-[132px] -top-[106.62px]">
                {/* Purple Ellipse */}
                <div className="absolute w-[292.31px] h-[447.44px] -left-[132px] top-[299.04px] bg-[#FF00D0] opacity-10 blur-[50px] transform matrix-[0.83,-0.56,0.33,0.94,0,0]"></div>

                {/* Light Blue Ellipse */}
                <div className="absolute w-[268.01px] h-[505.13px] left-[179.23px] -top-[106.62px] bg-[#ADD3FC] opacity-25 blur-[48.0171px] transform rotate-[-25.87deg]"></div>

                {/* Purple Blue Ellipse */}
                <div className="absolute w-[452.21px] h-[692.2px] left-[64px] top-[110px] bg-[#563DDE] opacity-10 blur-[50px] transform matrix-[0.83,-0.56,0.33,0.94,0,0]"></div>
            </div>

            {/* Status Bar */}
            <div className="absolute top-[11px] left-[23px] w-[344px] h-[21px] flex items-center">
                <span className="font-poppins font-medium text-[15px] leading-[38px] text-[#1A202C]">14:12</span>
            </div>

            {/* Status Bar Icons */}
            <div className="absolute top-[11px] right-[23px] flex items-center space-x-1">
                <div className="w-[142px] h-[21px] bg-[#001815] rounded-[40px]"></div>
            </div>

            {/* SubsiGenie Logo with Robot */}
            <div className="absolute w-[270.16px] h-[110px] left-[31px] top-[36px] filter drop-shadow-[0px_0px_18.1319px_#FFFFFF]">
                <Image
                    src="/image.png"
                    alt="SubsiGenie Logo"
                    width={270}
                    height={110}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Ready Heading */}
            <div className="absolute left-[57px] top-[198px] w-[275px] h-[62px]">
                <h1 className="font-poppins font-medium text-[24px] leading-[36px] text-[#563DDE]">Je bent er klaar voor!</h1>
            </div>

            {/* RVO Submission Question */}
            <div className="absolute left-[58px] top-[260px] w-[248px] h-[60px]">
                <p className="font-poppins font-medium text-[20px] leading-[30px] text-black">
                    Mag ik de benodigde gegevens uit je Business wallet, het opgestelde projectplan en je begroting bij RVO aanleveren?
                </p>
            </div>

            {/* Check Something Button (White) */}
            <div className="absolute left-[23px] top-[608px] w-[344px] h-[71px]">
                <button
                    onClick={handleCheck}
                    disabled={isChecking}
                    className="w-full h-full bg-white rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-50 active:scale-95 relative"
                >
                    {/* Left Chevron Icon */}
                    <div className="absolute left-[39px] top-[17px] w-[36px] h-[36px] flex items-center justify-center">
                        <ChevronLeft className="w-9 h-9 text-[#563DDE]" />
                    </div>

                    {/* Button Text */}
                    <div className="absolute left-[56px] top-[10px] w-[311px] h-[51px] flex items-center justify-center">
                        {isChecking ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#563DDE] mr-2"></div>
                                <span className="font-poppins font-medium text-[20px] leading-[30px] text-[#563DDE]">Bezig...</span>
                            </div>
                        ) : (
                            <span className="font-poppins font-medium text-[20px] leading-[30px] text-[#563DDE] text-center">Ik wil nog iets controleren</span>
                        )}
                    </div>
                </button>
            </div>

            {/* Submit Application Button (Purple) */}
            <div className="absolute left-[23px] top-[697px] w-[344px] h-[71px]">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-full bg-[#563DDE] rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[#4A2BC7] active:scale-95 relative"
                >
                    {/* Button Text */}
                    <div className="absolute left-[23px] top-[10px] w-[303px] h-[51px] flex items-center justify-center">
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                <span className="font-poppins font-medium text-[20px] leading-[30px] text-white">Versturen...</span>
                            </div>
                        ) : (
                            <span className="font-poppins font-medium text-[20px] leading-[30px] text-white text-center">Verstuur mijn aanvraag</span>
                        )}
                    </div>

                    {/* Right Chevron Icon */}
                    <div className="absolute right-[39px] top-[17px] w-[36px] h-[36px] flex items-center justify-center">
                        <ChevronRight className="w-9 h-9 text-white" />
                    </div>
                </button>
            </div>

            {/* Bottom Navigation Indicator */}
            <div className="absolute left-[121px] top-[830px] w-[148px] h-[4px] bg-[#D9D9D9] rounded-[4px]"></div>
        </div>
    )
}

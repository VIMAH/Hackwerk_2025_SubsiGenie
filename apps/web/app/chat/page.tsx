'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ChatLanding() {
    const [inputValue, setInputValue] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        setIsProcessing(true)
        // Simulate processing
        setTimeout(() => {
            // Redirect to confirmation page
            window.location.href = '/chat/confirm'
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
            <div className="absolute w-[550.15px] h-[224px] left-[57px] top-[133px] filter drop-shadow-[0px_0px_36.9231px_#FFFFFF]">
                <Image
                    src="/image.png"
                    alt="SubsiGenie Logo"
                    width={550}
                    height={224}
                    className="w-full h-full object-contain object-left"
                />
            </div>

            {/* Welcome Message */}
            <div className="absolute left-[57px] top-[490px] w-[248px] h-[62px]">
                <h1 className="font-poppins font-medium text-[24px] leading-[36px] text-[#563DDE]">Welkom,</h1>
            </div>

            {/* Question */}
            <div className="absolute left-[58px] top-[552px] w-[248px] h-[60px]">
                <p className="font-poppins font-medium text-[20px] leading-[30px] text-black">Welke subsidie wil je vandaag aanvragen?</p>
            </div>

            {/* Input Field */}
            <div className="absolute left-[31px] top-[697px] w-[318px] h-[71px]">
                <form onSubmit={handleSubmit} className="w-full h-full">
                    <div className="relative w-full h-full">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder=""
                            disabled={isProcessing}
                            className="w-full h-full bg-white rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] px-6 py-4 font-open-sans font-light text-[32px] leading-[38px] text-black placeholder-transparent focus:outline-none disabled:opacity-50"
                        />
                        {/* Cursor indicator */}
                        {!inputValue && !isProcessing && (
                            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-0.5 h-8 bg-black animate-pulse"></div>
                        )}
                        {/* Processing indicator */}
                        {isProcessing && (
                            <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#563DDE]"></div>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* Bottom Navigation Indicator */}
            <div className="absolute left-[121px] top-[830px] w-[148px] h-[4px] bg-[#D9D9D9] rounded-[4px]"></div>
        </div>
    )
}

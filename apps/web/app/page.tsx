'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function LandingPage() {
    const [isAuthorizing, setIsAuthorizing] = useState(false)

    const handleAuthorize = async () => {
        setIsAuthorizing(true)
        // Simulate authorization process
        setTimeout(() => {
            // Redirect to authorization info page
            window.location.href = '/authorization'
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
            <div className="absolute w-[550.15px] h-[224px] left-[49px] top-[133px] filter drop-shadow-[0px_0px_36.9231px_#FFFFFF]">
                <Image
                    src="/image.png"
                    alt="SubsiGenie Logo"
                    width={550}
                    height={224}
                    className="w-full h-full object-contain object-left"
                />
            </div>

            {/* Welcome Message */}
            <div className="absolute left-[49px] top-[441px] w-[248px] h-[62px]">
                <h1 className="font-poppins font-medium text-[24px] leading-[36px] text-[#563DDE]">Welkom,</h1>
            </div>

            {/* Explanation Text */}
            <div className="absolute left-[49px] top-[503px] w-[297px] h-[163px]">
                <p className="font-poppins font-medium text-[20px] leading-[30px] text-black">
                    Om jouw subsidies te regelen<br />
                    moet ik gemachtigd worden<br />
                    om namens jou de<br />
                    aanvragen te mogen doen
                </p>
            </div>

            {/* Authorization Button */}
            <div className="absolute left-[35px] top-[697px] w-[320px] h-[71px]">
                <button
                    onClick={handleAuthorize}
                    disabled={isAuthorizing}
                    className="w-full h-full bg-[#563DDE] rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[#4A2BC7] active:scale-95"
                >
                    <div className="w-full h-[51px] flex items-center justify-center">
                        {isAuthorizing ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                <span className="font-poppins font-medium text-[20px] leading-[30px] text-white">Bezig met machtigen...</span>
                            </div>
                        ) : (
                            <span className="font-poppins font-medium text-[20px] leading-[30px] text-white text-center">SubsiGenie machtigen</span>
                        )}
                    </div>
                </button>
            </div>

            {/* Bottom Navigation Indicator */}
            <div className="absolute left-[121px] top-[830px] w-[148px] h-[4px] bg-[#D9D9D9] rounded-[4px]"></div>
        </div>
    )
}



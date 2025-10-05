'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Upload } from 'lucide-react'

export default function SubmittingPage() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Simulate submission progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    // Redirect to application success page after completion
                    setTimeout(() => {
                        window.location.href = '/application-success'
                    }, 1000)
                    return 100
                }
                return prev + 2
            })
        }, 100)

        return () => clearInterval(interval)
    }, [])

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

            {/* Submission Loading Heading */}
            <div className="absolute left-[57px] top-[490px] w-[248px] h-[62px]">
                <h1 className="font-poppins font-medium text-[24px] leading-[36px] text-[#563DDE]">Aanvraag verzenden...</h1>
            </div>

            {/* Complex Upload Icon with Gradient and Blend Modes */}
            <div className="absolute left-[154px] top-[653px] w-[71px] h-[71px]">
                {/* Base Purple Circle */}
                <div className="absolute w-[71px] h-[71px] bg-[#563DDE] rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)]"></div>

                {/* Gradient Overlay Circle */}
                <div
                    className="absolute w-[83px] h-[83px] rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] transform rotate-90 mix-blend-overlay"
                    style={{
                        background: 'linear-gradient(180deg, #FF62FC 0%, #563DDE 100%)'
                    }}
                ></div>

                {/* Cloud Upload Icon with Soft Light Blend */}
                <div className="absolute left-[13px] top-[11px] w-[47px] h-[47px] mix-blend-soft-light">
                    <div
                        className="w-full h-full rounded-full"
                        style={{
                            background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #FFABFE 100%)'
                        }}
                    >
                        <Upload className="w-full h-full text-white" />
                    </div>
                </div>

                {/* Additional Cloud Upload Icon with Hard Light Blend */}
                <div className="absolute left-[14px] top-[16px] w-[47px] h-[47px] mix-blend-hard-light">
                    <Upload className="w-full h-full text-white" />
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute left-[50px] top-[580px] w-[290px] h-[4px] bg-gray-200 rounded-full">
                <div
                    className="h-full bg-[#563DDE] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Progress Text */}
            <div className="absolute left-[50px] top-[600px] w-[290px] h-[20px] text-center">
                <span className="font-poppins font-medium text-[16px] text-[#563DDE]">{progress}%</span>
            </div>

            {/* Bottom Navigation Indicator */}
            <div className="absolute left-[121px] top-[830px] w-[148px] h-[4px] bg-[#D9D9D9] rounded-[4px]"></div>
        </div>
    )
}

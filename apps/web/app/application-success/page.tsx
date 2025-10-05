'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ApplicationSuccess() {
    const [days, setDays] = useState(2)

    useEffect(() => {
        // Simulate countdown or update
        const interval = setInterval(() => {
            setDays(prev => {
                if (prev <= 0) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 0.1
            })
        }, 10000) // Update every 10 seconds

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

            {/* Success Message */}
            <div className="absolute left-[57px] top-[401px] w-[288px] h-[62px]">
                <h1 className="font-poppins font-medium text-[24px] leading-[36px] text-[#563DDE]">Je DHI subsidie aanvraag is verzonden!</h1>
            </div>

            {/* RVO Assessment Information */}
            <div className="absolute left-[57px] top-[499px] w-[288px] h-[225px]">
                <p className="font-poppins font-medium text-[16px] leading-[24px] text-black">
                    RVO beoordeelt uw aanvraag. Komt uw aanvraag in aanmerking voor subsidie? Dan kunt u beginnen met de uitvoering van uw project.
                </p>
            </div>

            {/* Round Progress Counter */}
            <div className="absolute left-[148px] top-[647px] w-[83px] h-[83px]">
                {/* Gradient Background Circle */}
                <div
                    className="absolute w-[89px] h-[89px] left-[-19.29px] top-[-19.29px] rounded-full mix-blend-plus-lighter transform rotate-[60deg]"
                    style={{
                        background: 'linear-gradient(180deg, #563DDE 0%, #FF62FC 100%)'
                    }}
                ></div>

                {/* White Background Circle */}
                <div className="absolute w-[83px] h-[83px] bg-white rounded-[98px] transform rotate-90 mix-blend-normal"></div>

                {/* Inner White Circle with Shadow */}
                <div className="absolute w-[71px] h-[71px] left-[6px] top-[6px] bg-white rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)]"></div>

                {/* Days Counter Text */}
                <div className="absolute w-[71px] h-[58px] left-[6px] top-[13px] flex flex-col items-center justify-center">
                    <span className="font-poppins font-medium text-[16px] leading-[20px] text-[#563DDE] text-center">
                        {Math.ceil(days)}<br />
                        dagen
                    </span>
                </div>
            </div>

            {/* Bottom Navigation Indicator */}
            <div className="absolute left-[121px] top-[830px] w-[148px] h-[4px] bg-[#D9D9D9] rounded-[4px]"></div>
        </div>
    )
}

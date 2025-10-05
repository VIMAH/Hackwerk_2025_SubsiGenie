'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronRight, Calendar } from 'lucide-react'

export default function ProjectPlan() {
    const [countries, setCountries] = useState('')
    const [projectTitle, setProjectTitle] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    // Calculate progress based on form completion
    const calculateProgress = () => {
        let completed = 0
        if (countries.trim()) completed++
        if (projectTitle.trim()) completed++
        if (startDate.trim()) completed++
        if (endDate.trim()) completed++
        return (completed / 4) * 100
    }

    const progress = calculateProgress()
    const isComplete = progress === 100

    const handleNext = () => {
        // Handle next step
        console.log('Project plan data:', { countries, projectTitle, startDate, endDate })
        // Redirect to budget page
        window.location.href = '/budget'
    }

    const handleProgressClick = () => {
        if (isComplete) {
            handleNext()
        }
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

            {/* Project Plan Heading */}
            <div className="absolute left-[52px] top-[208px] w-[315px] h-[62px]">
                <h1 className="font-poppins font-medium text-[24px] leading-[36px] text-[#563DDE]">Projectplan samenstellen</h1>
            </div>

            {/* Countries Input Field */}
            <div className="absolute left-[52px] top-[281px] w-[295px] h-[70px]">
                <label className="font-poppins font-medium text-[20px] leading-[30px] text-black block mb-2">
                    Landen waar het project plaatsvindt
                </label>
            </div>
            <div className="absolute left-[23px] top-[351px] w-[344px] h-[71px]">
                <input
                    type="text"
                    value={countries}
                    onChange={(e) => setCountries(e.target.value)}
                    placeholder=""
                    className="w-full h-full bg-white rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] px-6 py-4 font-open-sans font-light text-[32px] leading-[38px] text-black focus:outline-none"
                />
                {/* Cursor indicator */}
                {!countries && (
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-0.5 h-8 bg-black animate-pulse"></div>
                )}
            </div>

            {/* Project Title Input Field */}
            <div className="absolute left-[52px] top-[433px] w-[295px] h-[70px]">
                <label className="font-poppins font-medium text-[20px] leading-[30px] text-black block mb-2">
                    Projecttitel
                </label>
            </div>
            <div className="absolute left-[23px] top-[503px] w-[344px] h-[71px]">
                <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Projecttitel"
                    className="w-full h-full bg-white rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] px-6 py-4 font-open-sans font-light text-[24px] leading-[38px] text-[#ADD3FC] focus:outline-none placeholder-[#ADD3FC]"
                />
            </div>

            {/* Date Input Fields */}
            <div className="absolute left-[52px] top-[584px] w-[295px] h-[70px]">
                <label className="font-poppins font-medium text-[20px] leading-[30px] text-black block mb-2">
                    Start- en einddatum
                </label>
            </div>

            {/* Start Date Input Field */}
            <div className="absolute left-[23px] top-[654px] w-[170px] h-[71px]">
                <div className="relative w-full h-full">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full h-full bg-white rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] px-6 py-4 font-open-sans font-light text-[18px] leading-[38px] text-[#563DDE] focus:outline-none"
                    />
                </div>
            </div>

            {/* End Date Input Field */}
            <div className="absolute left-[197px] top-[654px] w-[170px] h-[71px]">
                <div className="relative w-full h-full">
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full h-full bg-white rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] px-6 py-4 font-open-sans font-light text-[18px] leading-[38px] text-[#563DDE] focus:outline-none"
                    />
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute left-[23px] top-[765px] w-[344px] h-[35px]">
                <div
                    className={`w-full h-full bg-white rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] relative ${isComplete ? 'cursor-pointer' : 'cursor-default'}`}
                    onClick={handleProgressClick}
                >
                    {/* Dynamic Purple Progress Segment */}
                    <div
                        className="absolute left-[3px] top-[2px] h-[31px] bg-[#563DDE] rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] flex items-center justify-center transition-all duration-300 ease-in-out"
                        style={{
                            width: `${Math.max(66, (progress / 100) * 338)}px` // Minimum 66px, maximum 338px
                        }}
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </div>
                    {/* Progress Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-poppins font-medium text-[14px] leading-[21px] text-[#563DDE]">
                            {Math.round(progress)}% voltooid
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Indicator */}
            <div className="absolute left-[121px] top-[830px] w-[148px] h-[4px] bg-[#D9D9D9] rounded-[4px]"></div>
        </div>
    )
}

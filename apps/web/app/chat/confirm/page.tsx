'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ChatConfirm() {
    const [isConfirming, setIsConfirming] = useState(false)

    // Real API call function (not executed by button)
    const makeRealApiCall = async () => {
        try {
            const response = await fetch('http://localhost:3001/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: 'https://www.rvo.nl/subsidies-financiering/dhi-haalbaarheidsstudies'
                })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            console.log('Real Backend API Response:', data)
            return data

        } catch (error) {
            console.error('Real Backend API Error:', error)
            throw error
        }
    }

    const handleConfirm = async () => {
        setIsConfirming(true)

        try {
            // Use hardcoded/mocked response for button execution
            const mockedResponse = {
                success: true,
                url: "https://www.rvo.nl/subsidies-financiering/dhi-haalbaarheidsstudies",
                title: "DHI-subsidieregeling: Haalbaarheidsstudies",
                analyzed_at: "2025-10-03T00:21:16.216Z",
                pages_analyzed: 6,
                attestations: ["chamber_of_commerce_kvk_nummer", "chamber_of_commerce_rechtsvorm", "certificates_mbk_verklaring"],
                non_attestations: ["haalbaarheidsstudie", "businessplan", "projectplan", "eHerkenning niveau 2+", "RVO-inlog", "DHI-voortgangsrapportages", "DHI-eindrapportages", "wijzigingsformulier"],
                analysis_notes: "The content mentions several requirements for the DHI subsidy. These include having a KvK number, being an mkb company, and having a legal form. Non-attestation requirements include conducting a feasibility study, creating a business or project plan, having eHerkenning level 2+, and submitting progress and final reports. Changes in the project plan must be reported using a change form."
            }

            console.log('Using hardcoded response for button execution:', mockedResponse)

            // Simulate processing time
            setTimeout(() => {
                // Redirect to subsidy information page
                window.location.href = '/subsidy'
            }, 2000)

        } catch (error) {
            console.error('Button execution error:', error)
            // Still redirect even if there's an error
            setTimeout(() => {
                window.location.href = '/subsidy'
            }, 2000)
        } finally {
            setIsConfirming(false)
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

            {/* DHI Subsidy Confirmation Text */}
            <div className="absolute left-[52px] top-[310px] w-[306px] h-[139px]">
                <p className="font-poppins font-medium text-[20px] leading-[30px] text-black">
                    Ik begrijp dat je de DHI* subsidie wilt aanvragen ter voorbereiding op de export van uw producten of diensten aan het buitenland
                </p>
                <p className="font-poppins font-medium text-[20px] leading-[30px] text-[#563DDE] mt-2">
                    *(Demonstratieprojecten, Haalbaarheidsstudies en Investeringsvoorbereidingsstudies)
                </p>
            </div>

            {/* Confirmation Question */}
            <div className="absolute left-[52px] top-[573px] w-[248px] h-[62px]">
                <h2 className="font-poppins font-medium text-[24px] leading-[36px] text-[#563DDE]">Klopt dit?</h2>
            </div>

            {/* Confirmation Button */}
            <div className="absolute left-[23px] top-[697px] w-[344px] h-[71px]">
                <button
                    onClick={handleConfirm}
                    disabled={isConfirming}
                    className="w-full h-full bg-[#563DDE] rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[#4A2BC7] active:scale-95"
                >
                    <div className="w-full h-[51px] flex items-center justify-center">
                        {isConfirming ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                <span className="font-poppins font-medium text-[20px] leading-[30px] text-white">Bezig...</span>
                            </div>
                        ) : (
                            <span className="font-poppins font-medium text-[20px] leading-[30px] text-white text-center">Ja, dat klopt</span>
                        )}
                    </div>
                </button>
            </div>

            {/* Bottom Navigation Indicator */}
            <div className="absolute left-[121px] top-[830px] w-[148px] h-[4px] bg-[#D9D9D9] rounded-[4px]"></div>
        </div>
    )
}

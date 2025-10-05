'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

export default function WalletInfo() {
    const [isRetrieving, setIsRetrieving] = useState(false)

    const handleRetrieve = async () => {
        setIsRetrieving(true)

        try {
            // Fetch KVK attestation from local JSON file
            const response = await fetch('/kvk_attestatie.json')
            const walletData = await response.json()

            // Store wallet data in sessionStorage for later use
            sessionStorage.setItem('walletCredentials', JSON.stringify(walletData))

            console.log('Wallet credentials retrieved:', walletData)

            // Simulate retrieval process
            setTimeout(() => {
                // Redirect to chat page after retrieval
                window.location.href = '/chat'
            }, 2000)
        } catch (error) {
            console.error('Error retrieving wallet credentials:', error)
            // Still redirect even if there's an error
            setTimeout(() => {
                window.location.href = '/chat'
            }, 2000)
        } finally {
            setIsRetrieving(false)
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

            {/* First Information Block */}
            <div className="absolute left-[56px] top-[321px] w-[299px] h-[159px]">
                <p className="font-poppins font-medium text-[20px] leading-[30px] text-black">
                    Ik kan jou bedrijfs-gegevens ophalen en delen met subsidie-verstrekkers vanuit je <strong>Business Wallet</strong>
                </p>
            </div>

            {/* Second Information Block */}
            <div className="absolute left-[56px] top-[472px] w-[278px] h-[163px]">
                <p className="font-poppins font-medium text-[20px] leading-[30px] text-black">
                    Het adres van jouw Business wallet kan ik ophalen uit je persoonlijke wallet<br />
                    <span className="text-[#563DDE]">Wil je dat ik dit doe?</span>
                </p>
            </div>

            {/* Retrieval Button */}
            <div className="absolute left-[35px] top-[697px] w-[320px] h-[71px]">
                <button
                    onClick={handleRetrieve}
                    disabled={isRetrieving}
                    className="w-full h-full bg-[#563DDE] rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[#4A2BC7] active:scale-95 relative"
                >
                    {/* Light Blue Circle with Icon */}
                    <div className="absolute left-[7px] top-[6px] w-[59px] h-[59px] bg-[#ADD3FC] rounded-full mix-blend-overlay flex items-center justify-center">
                        <ChevronRight className="w-[36px] h-[36px] text-white" />
                    </div>

                    {/* Button Text */}
                    <div className="absolute left-[113px] top-[6px] w-[226px] h-[47px] flex items-center justify-center">
                        {isRetrieving ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                <span className="font-poppins font-medium text-[20px] leading-[30px] text-white">Bezig...</span>
                            </div>
                        ) : (
                            <span className="font-poppins font-medium text-[20px] leading-[30px] text-white text-center">Ophalen uit persoonlijke wallet</span>
                        )}
                    </div>
                </button>
            </div>

            {/* Bottom Navigation Indicator */}
            <div className="absolute left-[121px] top-[830px] w-[148px] h-[4px] bg-[#D9D9D9] rounded-[4px]"></div>
        </div>
    )
}

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface CredentialCheck {
    name: string
    found: boolean
    value?: string
}

export default function BusinessWalletCheck() {
    const [isChecking, setIsChecking] = useState(false)
    const [credentialChecks, setCredentialChecks] = useState<CredentialCheck[]>([
        { name: 'Chamber of Commerce number', found: true, value: 'NLNHR.4403655' },
        { name: 'Chamber of Commerce legal form', found: true, value: 'Besloten Vennootschap (B.V.)' },
        { name: 'Certificates MBK declaration', found: true, value: 'Valid' }
    ])

    useEffect(() => {
        // Check credentials when component mounts
        checkCredentials()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkCredentials = async () => {
        try {
            // Get mocked RVO API response
            const mockedRvoResponse = {
                success: true,
                url: "https://www.rvo.nl/subsidies-financiering/dhi-haalbaarheidsstudies",
                title: "DHI-subsidieregeling: Haalbaarheidsstudies",
                analyzed_at: "2025-10-03T00:21:16.216Z",
                pages_analyzed: 6,
                attestations: ["chamber_of_commerce_kvk_nummer", "chamber_of_commerce_rechtsvorm", "certificates_mbk_verklaring"],
                non_attestations: ["haalbaarheidsstudie", "businessplan", "projectplan", "eHerkenning niveau 2+", "RVO-inlog", "DHI-voortgangsrapportages", "DHI-eindrapportages", "wijzigingsformulier"],
                analysis_notes: "The content mentions several requirements for the DHI subsidy..."
            }

            // Get wallet credentials from sessionStorage
            const walletDataStr = sessionStorage.getItem('walletCredentials')
            if (!walletDataStr) return

            const walletData = JSON.parse(walletDataStr)
            const updatedChecks: CredentialCheck[] = []

            // Check chamber_of_commerce_kvk_nummer
            const kvkCred = walletData.content.find((cred: any) =>
                cred.displayProperties?.credentialTypeDisplay?.displayName === "KVK Registratie"
            )
            updatedChecks.push({
                name: 'Chamber of Commerce number',
                found: !!kvkCred?.credentialSubject?.identifier?.EUID,
                value: kvkCred?.credentialSubject?.identifier?.EUID
            })

            // Check chamber_of_commerce_rechtsvorm
            updatedChecks.push({
                name: 'Chamber of Commerce legal form',
                found: !!kvkCred?.credentialSubject?.legalFormType,
                value: kvkCred?.credentialSubject?.legalFormType
            })

            // Check certificates_mbk_verklaring
            const mkbCred = walletData.content.find((cred: any) =>
                cred.displayProperties?.credentialTypeDisplay?.displayName === "MKB Verklaring"
            )
            updatedChecks.push({
                name: 'Certificates MBK declaration',
                found: !!mkbCred,
                value: mkbCred ? 'Valid' : undefined
            })

            setCredentialChecks(updatedChecks)
            console.log('Credential check results:', updatedChecks)
        } catch (error) {
            console.error('Error checking credentials:', error)
        }
    }

    const handleCheck = async () => {
        setIsChecking(true)
        // Simulate checking process
        setTimeout(() => {
            // Redirect to success page after checking
            window.location.href = '/success'
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

            {/* Introductory Text */}
            <div className="absolute left-[52px] top-[213px] w-[295px] h-[90px]">
                <p className="font-poppins font-medium text-[16px] leading-[24px] text-black">
                    Veel van de hiervoor benodigde gegevens kunnen we ophalen uit uw
                </p>
            </div>

            {/* Business Wallet Heading */}
            <div className="absolute left-[52px] top-[272px] w-[248px] h-[62px]">
                <h2 className="font-poppins font-medium text-[24px] leading-[36px] text-[#563DDE]">Business Wallet:</h2>
            </div>

            {/* Credentials List */}
            <div className="absolute left-[52px] top-[334px] w-[295px] h-[336px]">
                <div className="space-y-0">
                    {credentialChecks.map((credential, index) => (
                        <div key={index} className="flex items-center mb-0">
                            {/* Credential Text with checkmark */}
                            <span className="font-poppins font-normal text-[16px] leading-[40px] text-black">
                                {credential.found && '✅ '}{credential.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Check Business Wallet Button */}
            <div className="absolute left-[23px] top-[697px] w-[344px] h-[71px]">
                <button
                    onClick={handleCheck}
                    disabled={isChecking}
                    className="w-full h-full bg-[#563DDE] rounded-[98px] shadow-[-10px_-10px_30px_#FFFFFF,10px_10px_30px_rgba(174,174,192,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[#4A2BC7] active:scale-95"
                >
                    <div className="w-full h-[51px] flex items-center justify-center">
                        {isChecking ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                <span className="font-poppins font-medium text-[20px] leading-[30px] text-white">Bezig...</span>
                            </div>
                        ) : (
                            <span className="font-poppins font-medium text-[20px] leading-[30px] text-white text-center">Check mijn Business Wallet</span>
                        )}
                    </div>
                </button>
            </div>

            {/* Bottom Navigation Indicator */}
            <div className="absolute left-[121px] top-[830px] w-[148px] h-[4px] bg-[#D9D9D9] rounded-[4px]"></div>
        </div>
    )
}

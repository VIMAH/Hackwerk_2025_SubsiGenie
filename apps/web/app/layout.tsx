import type { Metadata } from 'next'
import { Inter, Poppins, Open_Sans } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/components/QueryProvider'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins'
})
const openSans = Open_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-open-sans'
})

export const metadata: Metadata = {
    title: 'SubsiGenie',
    description: 'AI Agent for DHI subsidy applications',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${poppins.variable} ${openSans.variable}`}>
                <QueryProvider>
                    {children}
                </QueryProvider>
            </body>
        </html>
    )
}



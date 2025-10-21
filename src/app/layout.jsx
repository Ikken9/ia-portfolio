import { Fira_Code } from "next/font/google"
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const firaCode = Fira_Code({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
})

export const viewport = {
    width: "device-width",
    initialScale: 1,
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" dir="ltr" className={firaCode.className}>
            <body className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            </body>
        </html>
    )
}
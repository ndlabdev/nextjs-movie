// ** Icons Imports
import {  } from 'lucide-react'

export default function TheFooter() {
    return (
        <footer className="text-sm pb-7 pt-14 md:pb-14 container mx-auto mt-12 flex-shrink-0 px-6">
            <div className="mb-3 items-center justify-center gap-2 overflow-x-auto border-b pb-3 md:flex">
                <div className="flex gap-6 items-center text-white">
                    <a className="whitespace-nowrap flex items-center justify-start gap-10 outline-none focus-visible:ring-2 relative" href="/api-docs">Developers</a>
                    <a className="whitespace-nowrap flex items-center justify-start gap-10 outline-none focus-visible:ring-2 relative" href="/pages/privacy-policy">Privacy Policy</a>
                    <a className="whitespace-nowrap flex items-center justify-start gap-10 outline-none focus-visible:ring-2 relative" href="/pages/terms-of-service">Terms of Service</a>
                    <a className="whitespace-nowrap flex items-center justify-start gap-10 outline-none focus-visible:ring-2 relative" href="/contact">Contact Us</a>
                </div>
            </div>

            <div className="items-center justify-center gap-2 text-center text-defa md:flex md:text-left">Copyright © 2025 MTDb, All Rights Reserved</div>
        </footer>
    )
}

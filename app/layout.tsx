// ** CSS Imports
import '@/styles/globals.css'

// ** Next Imports
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'

// ** Providers Imports
import { Providers } from './providers'

// ** Configs Imports
import { siteConfig } from '@/configs/site'
import { fontSans } from '@/configs/fonts'

// ** Components Imports
import TheaHeader from '@/components/layouts/headers/TheHeader'
import TheFooter from '@/components/layouts/TheFooter'

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico'
    }
}

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' }
    ]
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body
                className={clsx(
                    'font-sans antialiased min-h-dvh text-white bg-stone-900',
                    fontSans.variable
                )}
            >
                <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
                    <TheaHeader />

                    <div className='flex-auto'>
                        <div className="relative min-h-[1000px] overflow-hidden">
                            {children}
                        </div>
                    </div>

                    <TheFooter />
                </Providers>
            </body>
        </html>
    )
}

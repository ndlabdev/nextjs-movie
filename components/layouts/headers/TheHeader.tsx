// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** Components Imports
import TheDropdownAuth from './TheDropdownAuth'
import TheSearchMovie from './TheSearchMovie'

const headerItem = [
    {
        title: 'Movies',
        href: '/movies'
    },
    {
        title: 'TV Series',
        href: '/tv-series'
    },
    {
        title: 'Watchlist',
        href: '/watchlist'
    }
]

export default function TheHeader() {
    return (
        <div className="flex flex-col">
            <div className="bg-stone-600 text-white border-b h-16 py-2 border-none relative z-10 w-full flex-shrink-0">
                <div className="flex h-full items-center justify-end gap-3 pl-14 pr-2 md:pl-4 md:pr-4">
                    <Link className="block flex-shrink-0 mr-1 md:mr-6 h-full max-h-7 md:max-h-9 text-4xl font-semibold mt-1" href='/'>
                        <Image
                            alt='logo'
                            className='w-full'
                            height={60}
                            src='/logo.png'
                            width={120}
                        />
                    </Link>

                    <TheSearchMovie />

                    <div className="flex gap-8 items-center mx-3 text-sm max-md:hidden">
                        {headerItem.map(item => (
                            <Link
                                key={item.href}
                                className="whitespace-nowrap flex items-center justify-start gap-2 opacity-90 hover:underline hover:opacity-100 outline-none focus-visible:ring-2 relative font-semibold"
                                href={item.href}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    <div className='ml-auto flex items-center gap-1 md:gap-3'>
                        <TheDropdownAuth />
                    </div>
                </div>
            </div>
        </div>
    )
}

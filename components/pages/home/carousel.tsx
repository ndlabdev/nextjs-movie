'use client'

import Image from 'next/image';
import Link from 'next/link';

import { useTrendingMovies } from '@/hooks/useTrending'

export default function HomeCarousel() {
    const { data } = useTrendingMovies();

    return (
        <div className="container mx-auto p-3 @container md:p-6">
            {data && data?.results.map(item => (
                <div key={item.id} className="mb-10 md:mb-13">
                    <div className="gap-6 md:flex">
                        <div className="relative flex-auto">
                            <div className='flex h-full select-none snap-x snap-mandatory snap-always items-center overflow-x-auto'>
                                <div className='relative h-full w-full flex-shrink-0 snap-start snap-normal overflow-hidden rounded'>
                                    <div className='group relative flex-shrink-0 h-full'>
                                        <Image
                                            alt={item.title}
                                            className="min-h-60 md:min-h-0 aspect-video bg-fg-base/4 object-cover block"
                                            decoding="async"
                                            draggable={false}
                                            height={720}
                                            loading="lazy"
                                            sizes="100vw"
                                            src={`https://image.tmdb.org/t/p/w1280/${item.poster_path}`}
                                            title={item.title}
                                            width={1280}
                                        />
                                    </div>

                                    <div className='absolute inset-0 isolate flex h-full w-full items-center justify-start gap-6 rounded p-7 text-white md:items-end'>
                                        <div className='absolute left-0 h-full w-full bg-gradient-to-b from-black/40 max-md:top-0 md:bottom-0 md:h-3/4 md:bg-gradient-to-t md:from-black/100' />

                                        <div className='max-h-80 aspect-poster z-10 shadow-md max-md:hidden group relative flex-shrink-0'>
                                            <Link href='/'>
                                                <Image
                                                    alt={item.title}
                                                    className='h-full w-full rounded bg-fg-base/4 object-cover block'
                                                    decoding='async'
                                                    draggable={false}
                                                    height={300}
                                                    loading="lazy"
                                                    src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                                                    title={item.title}
                                                    width={300}
                                                />

                                                <span className='pointer-events-none absolute inset-0 block bg-black opacity-0 transition-opacity group-hover:opacity-10' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-1/4 max-w-52 flex-shrink-0 max-md:hidden'>
                            ??
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

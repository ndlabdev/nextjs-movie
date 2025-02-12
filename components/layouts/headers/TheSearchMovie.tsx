'use client'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** HeroUI Imports
import { Popover, PopoverTrigger, PopoverContent, Input } from '@heroui/react'

// ** Utils Imports
import { getMediaType, getYear, showImage } from '@/utils/helpers'
import { useMovieSearch } from '@/hooks/useMovies'

export default function TheSearchMovie() {
    const { data, search, setSearch } = useMovieSearch()

    console.log(data)

    return (
        <Popover showArrow offset={10} placement="bottom">
            <PopoverTrigger>
                <form className='flex max-w-xl flex-auto items-center rounded text max-md:hidden'>
                    <Input placeholder='Search for movies, tv shows and people...' variant='flat' />
                </form>
            </PopoverTrigger>

            <PopoverContent className="w-[36rem] max-h-80 justify-center items-start rounded-sm px-0">
                {() => (
                    <div className='flex-auto overflow-y-auto overscroll-contain outline-none w-full'>
                        {data.results.map(item => (
                            <div key={item.id} className='w-full select-none outline-none cursor-pointer text-sm truncate flex items-center gap-3 text-main px-5 py-2 hover:bg-stone-700'>
                                <div className='rounded overflow-hidden flex-shrink-0 text-muted'>
                                    <div className='w-11 aspect-poster group relative flex-shrink-0'>
                                        <Link href='/'>
                                            <Image
                                                alt={item.title || item.name}
                                                className="h-full w-full rounded object-cover block"
                                                decoding="async"
                                                draggable={false}
                                                height={100}
                                                loading="lazy"
                                                sizes="100vw"
                                                src={showImage(item.poster_path || item.profile_path)}
                                                title={item.title || item.name}
                                                width={100}
                                            />

                                            <div className='pointer-events-none absolute inset-0 block bg-black opacity-0 transition-opacity group-hover:opacity-10' />
                                        </Link>
                                    </div>
                                </div>

                                <div className='min-w-auto mr-auto w-full overflow-hidden overflow-ellipsis'>
                                    {item.title || item.name}

                                    <div className="mt-1 whitespace-normal text-xs text-default-500">
                                        <div>
                                            <div className="mb-1">{getYear(item.release_date)}</div>
                                            <div>{getMediaType(item.media_type)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}

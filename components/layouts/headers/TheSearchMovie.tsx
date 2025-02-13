'use client'

// ** Next Imports
import Link from 'next/link'

// ** React Imports
import { useEffect, useState } from 'react'

// ** HeroUI Imports
import { Popover, PopoverTrigger, PopoverContent, Input } from '@heroui/react'

// ** Components Imports
import BaseImage from '@/components/base/image'

// ** Utils Imports
import { getMediaType, getYear } from '@/utils/helpers'
import { useMovieSearch } from '@/hooks/useMovies'

export default function TheSearchMovie() {
    const { data, search, setSearch } = useMovieSearch()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string | undefined>(search)

    // Debounce API calls to avoid too many requests
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(inputValue)
        }, 300)

        return () => clearTimeout(timeout)
    }, [inputValue])

    const navigationTo = (value: string, id: number) => {
        const media_type: Record<string, string> = {
            'movie': '/movies',
            'tv': '/tv-series',
            'person': '/people'
        }

        return `${media_type[value]}/${id}`
    }

    return (
        <Popover showArrow isOpen={isOpen} offset={10} placement="bottom" onOpenChange={setIsOpen}>
            <PopoverTrigger>
                <div className='flex max-w-xl flex-auto items-center rounded max-md:hidden' onSubmit={(e) => e.preventDefault()}>
                    <div className='h-full flex flex-col w-full cursor-pointer'>
                        <div className='relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-10 min-h-10 rounded-none transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background'>
                            <div className='inline-flex w-full items-center h-full box-border'>
                                <div className='w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text text-small group-data-[has-value=true]:text-default-foreground'>
                                    {inputValue || 'Search for movies, tv shows and people...'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-[36rem] max-h-80 justify-center items-start rounded-none px-0">
                {() => (
                    <>
                        <Input
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            autoFocus
                            placeholder='Search for movies, tv shows and people...'
                            radius='none'
                            value={inputValue}
                            variant='flat'
                            onChange={(e) => setInputValue(e.target.value)}
                        />

                        <div className='flex-auto overflow-y-auto overscroll-contain outline-none w-full'>
                            {data?.results.map(item => (
                                <Link
                                    key={item.id}
                                    className='w-full select-none outline-none cursor-pointer text-sm truncate flex items-center gap-3 text-main px-5 py-2 hover:bg-stone-700'
                                    href={navigationTo(item.media_type, item.id)}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className='rounded overflow-hidden flex-shrink-0 text-muted'>
                                        <div className='w-11 aspect-poster group relative flex-shrink-0'>
                                            <BaseImage
                                                aspect='poster'
                                                image={item.poster_path || item.profile_path}
                                                name={item.title || item.name}
                                            />
                                            <div className='pointer-events-none absolute inset-0 block bg-black opacity-0 transition-opacity group-hover:opacity-10' />
                                        </div>
                                    </div>

                                    <div className='min-w-auto mr-auto w-full overflow-hidden overflow-ellipsis'>
                                        {item.title || item.name}

                                        <div className="mt-1 whitespace-normal text-xs text-default-500">
                                            <div>
                                                {item.media_type === 'person' ? (
                                                    <div>{item.known_for_department}</div>
                                                ) : (
                                                    <>
                                                        {item.release_date || item.first_air_date && (<div className="mb-1">{getYear(item.release_date || item.first_air_date)}</div>)}
                                                        <div>{getMediaType(item.media_type)}</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </PopoverContent>
        </Popover>
    )
}

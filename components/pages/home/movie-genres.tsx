'use client'

// ** Next Imports
import Link from 'next/link'

// ** React Imports
import { useCallback, useEffect, useRef, useState } from 'react'

// ** HeroUI Imports
import { Button } from '@heroui/react'

// ** Icons Imports
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ** Components Imports
import BaseMovieCard from '@/components/base/movie/card'

export default function HomeMovieGenres() {
    const carouselRef = useRef<HTMLDivElement>(null)
    const [isAtStart, setIsAtStart] = useState(true)
    const [isAtEnd, setIsAtEnd] = useState(false)

    const checkScrollPosition = useCallback(() => {
        if (!carouselRef.current) return

        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current

        setIsAtStart(scrollLeft <= 0)
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1)
    }, [])

    useEffect(() => {
        const carousel = carouselRef.current

        if (!carousel) return

        carousel.addEventListener('scroll', checkScrollPosition)
        checkScrollPosition()

        return () => carousel.removeEventListener('scroll', checkScrollPosition)
    }, [checkScrollPosition])

    const handleScroll = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return

        const { clientWidth } = carouselRef.current
        const scrollAmount = clientWidth * 0.8

        carouselRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        })
    }

    const movie = {
        'backdrop_path': '/rn8Sg6C8aWKRWdqY4hIpmOaiuqS.jpg',
        'id': 710295,
        'title': 'Wolf Man',
        'original_title': 'Wolf Man',
        'overview': 'With his marriage fraying, Blake persuades his wife Charlotte to take a break from the city and visit his remote childhood home in rural Oregon...',
        'poster_path': '/vtdEHG1j07PqLlVyhKNZRHTPKGt.jpg',
        'media_type': 'movie',
        'adult': false,
        'original_language': 'en',
        'genre_ids': [27, 53],
        'popularity': 1086.996,
        'release_date': '2025-01-15',
        'video': false,
        'vote_average': 6.365,
        'vote_count': 229
    }

    return (
        <div className="mb-10 md:mb-13">
            <section className="mb-4 md:mb-7">
                <div className="flex-auto m-0">
                    <div className="flex items-center gap-x-11 gap-y-4 max-md:overflow-x-auto">
                        <div className="flex-auto">
                            <div className="relative flex items-center gap-1 pl-4 before:absolute before:left-0 before:h-5/6 before:w-1 before:rounded before:bg-primary">
                                <h2 className="text-2xl md:text-3xl font-semibold">
                                    <Link className="rounded outline-none transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-offset-2" href='/'>
                                        Kids and family movies
                                    </Link>
                                </h2>
                            </div>
                        </div>

                        <div className='flex flex-shrink-0 items-center gap-1'>
                            <Button
                                isIconOnly
                                className={`text-white ${isAtStart ? 'opacity-disabled' : ''}`}
                                startContent={<ChevronLeft />}
                                variant='light'
                                onPress={() => handleScroll('left')}
                            />

                            <Button
                                isIconOnly
                                className={`text-white ${isAtEnd ? 'opacity-disabled' : ''}`}
                                startContent={<ChevronRight />}
                                variant='light'
                                onPress={() => handleScroll('right')}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div
                ref={carouselRef}
                className='content-carousel relative w-full grid grid-flow-col grid-rows-[auto] overflow-x-auto overflow-y-hidden gap-6 snap-always snap-x snap-mandatory scroll-smooth content-grid-landscape'
            >
                {Array.from({ length: 15 }).map((_, index) => (    
                    <div key={index} className='snap-start snap-normal'>
                        <BaseMovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    )
}

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

// ** Hooks Imports
import { useMovieGenres } from '@/hooks/useMovieGenres'

// ** Types Imports
import { IMoviesResult } from '@/types/trending-movies'

// ** Interface
interface Props {
    categoryName: string
    movies: IMoviesResult[]
}

const MovieCarousel = ({ categoryName, movies }: Props) => {
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

    return (
        <div className="mb-10 md:mb-13">
            <section className="mb-4 md:mb-7">
                <div className="flex-auto m-0">
                    <div className="flex items-center gap-x-11 gap-y-4 max-md:overflow-x-auto">
                        <div className="flex-auto">
                            <div className="relative flex items-center gap-1 pl-4 before:absolute before:left-0 before:h-5/6 before:w-1 before:rounded before:bg-primary">
                                <h2 className="text-2xl md:text-3xl font-semibold">
                                    <Link className="rounded outline-none transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-offset-2" href='/'>
                                        {categoryName}
                                    </Link>
                                </h2>
                            </div>
                        </div>

                        <div className="flex flex-shrink-0 items-center gap-1">
                            <Button
                                isIconOnly
                                className={`text-white ${isAtStart ? 'opacity-disabled' : ''}`}
                                disabled={isAtStart}
                                startContent={<ChevronLeft />}
                                variant='light'
                                onPress={() => handleScroll('left')}
                            />

                            <Button
                                isIconOnly
                                className={`text-white ${isAtEnd ? 'opacity-disabled' : ''}`}
                                disabled={isAtEnd}
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
                className="content-carousel relative w-full grid grid-flow-col grid-rows-[auto] overflow-x-auto overflow-y-hidden gap-6 snap-always snap-x snap-mandatory scroll-smooth content-grid-landscape"
            >
                {movies.map((movie) => (
                    <div key={movie.id} className="snap-start snap-normal">
                        <BaseMovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function HomeMovieGenres() {
    const movieGenres = useMovieGenres()

    return (
        <>
            {movieGenres.map(item => (
                <MovieCarousel 
                    key={item.categoryId}
                    categoryName={item.categoryName}
                    movies={item.movies}
                />
            ))}
        </>
    )
}

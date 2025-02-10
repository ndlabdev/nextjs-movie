'use client'

// ** React Imports
import { useRef } from 'react'

// ** Components Imports
import BaseTitle from '@/components/base/title'
import BaseMovieCard from '@/components/base/movie/card'
import BaseCarouselScroll from '@/components/base/carousel-scroll'

// ** Types Imports
import { IMoviesResult } from '@/types/trending-movies'

// ** Interface
interface Props {
    categoryName: string
    movies: IMoviesResult[]
}

export default function BaseMovieCarousel({ categoryName, movies }: Props) {
    const carouselRef = useRef<HTMLDivElement>(null)

    return (
        <div className="mb-10 md:mb-13">
            <section className="mb-4 md:mb-7">
                <BaseTitle title={categoryName}>
                    <BaseCarouselScroll carouselRef={carouselRef} />
                </BaseTitle>
            </section>

            <div
                ref={carouselRef}
                className="content-carousel relative w-full grid grid-flow-col grid-rows-[auto] overflow-x-hidden overflow-y-hidden gap-6 snap-always snap-x snap-mandatory scroll-smooth content-grid-landscape"
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

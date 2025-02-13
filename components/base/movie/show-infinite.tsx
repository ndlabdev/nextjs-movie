'use client'

// ** Next Imports
import { useParams } from 'next/navigation'

// ** HeroUI Imports
import { Spinner } from '@heroui/react'

// ** Hooks Imports
import { useDiscoverMovie } from '@/hooks/useDiscover'

// ** Components Imports
import BaseMovieCard from '@/components/base/movie/card-poster'

// ** Interface
interface Props {
    type: 'movie' | 'tv'
}

export default function BaseMovieShowInfinite({ type }: Props) {
    const params = useParams()
    const { data, isFetching, isFetchingNextPage, observerRef } = useDiscoverMovie(type)
    const link = (params.slug ?? type) === 'movie' ? 'movies' : 'tv-series'

    if (isFetching && !data) {
        return (
            <div className="text-center py-4">
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <section className="transition-opacity">
                <div className="grid gap-4 grid-cols-[repeat(var(--nVisibleItems),minmax(0,1fr))] content-grid-portrait">
                    {data?.flatMap((page) =>
                        page.results.map((movie) => (
                            <div key={movie.id}>
                                <BaseMovieCard link={link} movie={movie} />
                            </div>
                        ))
                    )}
                </div>
            </section>

            {isFetchingNextPage && (
                <div className="text-center py-4">
                    <Spinner />
                </div>
            )}

            <div ref={observerRef} className="h-10" />
        </>
    )
}

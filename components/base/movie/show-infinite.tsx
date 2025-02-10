'use client'

// ** HeroUI Imports
import { Spinner } from '@heroui/react'

// ** Hooks Imports
import { useTVSeriesPopular } from '@/hooks/useTVSeries'

// ** Components Imports
import BaseMovieCard from '@/components/base/movie/card-poster'

export default function BaseMovieShowInfinite() {
    const { data, isFetchingNextPage, observerRef } = useTVSeriesPopular()

    return (
        <>
            <section className='transition-opacity'>
                <div className='grid gap-4 grid-cols-[repeat(var(--nVisibleItems),minmax(0,1fr))] content-grid-portrait'>
                    {data?.pages.map((page) =>
                        page.results.map((movie) => (
                            <div key={movie.id}>
                                <BaseMovieCard movie={movie} />
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

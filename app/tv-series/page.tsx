'use client'

// ** HeroUI Imports
import { Button, Spinner } from '@heroui/react'

// ** Icons Imports
import { AlignLeft } from 'lucide-react'

// ** Hooks Imports
import { useTVSeriesPopular } from '@/hooks/useTVSeries'

// ** Components Imports
import BaseMovieCard from '@/components/base/movie/cardPoster'

export default function TVSeries() {
    const { data, isFetchingNextPage, observerRef } = useTVSeriesPopular()

    return (
        <div className="pb-6">
            <div className="container mx-auto p-3 @container md:p-6">
                <section className="mb-5 md:mb-10">
                    <div className="flex-auto m-0">
                        <div className="flex items-center gap-x-11 gap-y-4 max-md:overflow-x-auto">
                            <div className="flex-auto">
                                <div className="relative flex items-center gap-1 pl-4 before:absolute before:left-0 before:h-5/6 before:w-1 before:rounded before:bg-primary">
                                    <h1 className="text-2xl md:text-3xl font-semibold">
                                    TV Series
                                    </h1>
                                </div>
                            </div>

                            <div className='flex flex-shrink-0 items-center gap-1'>
                                <Button
                                    className='text-white'
                                    startContent={<AlignLeft size={20} />}
                                    variant='light'
                                >
                                    Most popular first
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

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
            </div>
        </div>
    )
}

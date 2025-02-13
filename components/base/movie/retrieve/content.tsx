'use client'

// ** Components Imports
import BaseMovieRetrieveCast from '@/components/base/movie/retrieve/cast'
import BaseMovieRetrieveSeasons from '@/components/base/movie/retrieve/seasons'
import BaseMovieRetrieveGeneral from '@/components/base/movie/retrieve/general'
import BaseMovieRetrieveSummary from '@/components/base/movie/retrieve/summary'
import BaseMovieRetrieveImages from '@/components/base/movie/retrieve/images'
import BaseMovieRetrieveReviews from '@/components/base/movie/retrieve/reviews'
import BaseMovieRetrieveRecommendations from '@/components/base/movie/retrieve/recommendations'

// ** Context Imports
import { useMovieRetrieveContext } from '@/context/movie/retrieve'

// ** Interface
interface Props {
    type?: 'movie' | 'tv'
}

export default function BaseMovieRetrieveContent({ type = 'movie' }: Props) {
    // ** useHooks
    const data = useMovieRetrieveContext()
    const isMovie = type === 'movie'

    return (
        <div className="container mx-auto mt-6 px-3 md:mt-10 md:px-6">
            <div className="items-start gap-14 md:flex">
                <div className="top-10 flex-shrink-0 md:sticky md:w-1/4 max-lg:hidden">
                    <BaseMovieRetrieveSummary data={data} isMovie={isMovie} />
                </div>

                <div className='flex-auto space-y-12'>
                    <BaseMovieRetrieveGeneral data={data} isMovie={isMovie} />
                    <BaseMovieRetrieveSeasons data={data} />
                    <BaseMovieRetrieveImages data={data} link={isMovie ? 'movies' : 'tv-series'} />
                    <BaseMovieRetrieveCast data={data} link={isMovie ? 'movies' : 'tv-series'} />
                    <BaseMovieRetrieveReviews data={data} />
                </div>
            </div>

            <BaseMovieRetrieveRecommendations data={data} isMovie={isMovie} />
        </div>
    )
}

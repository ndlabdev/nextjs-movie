// ** Components Imports
import BaseMovieCarousel from '@/components/base/movie/carousel'

// ** Types Imports
import { IMovies } from '@/types/movies'

// ** Interface
interface Props {
    isMovie?: boolean
    data: IMovies
}

export default function BaseMovieRetrieveRecommendations({ data, isMovie }: Props) {
    if (!data.recommendations.total_pages) return null

    return (
        <section className='mt-12'>
            <BaseMovieCarousel
                categoryName='Movies Recommendations'
                isMovie={isMovie}
                movies={data.recommendations.results}
            />
        </section>
    )
}

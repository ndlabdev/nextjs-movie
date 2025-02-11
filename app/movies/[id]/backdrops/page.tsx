// ** Components Imports
import BaseMovieRetrieveBackdrops from '@/components/base/movie/retrieve/backdrops'

// ** Context Imports
import { MovieRetrieveProvider } from '@/context/movie/retrieve'

export default function MovieBackdrops() {
    return (
        <MovieRetrieveProvider>
            <BaseMovieRetrieveBackdrops />
        </MovieRetrieveProvider>
    )
}

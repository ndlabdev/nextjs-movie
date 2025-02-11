// ** Components Imports
import BaseMovieRetrieveCredits from '@/components/base/movie/retrieve/credits'

// ** Context Imports
import { MovieRetrieveProvider } from '@/context/movie/retrieve'

export default function MovieCredits() {
    return (
        <MovieRetrieveProvider>
            <BaseMovieRetrieveCredits />
        </MovieRetrieveProvider>
    )
}

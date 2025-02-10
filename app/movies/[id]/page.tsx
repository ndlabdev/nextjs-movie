// ** Components Imports
import BaseMovieRetrieveContent from '@/components/base/movie/retrieve/content'

// ** Context Imports
import { MovieRetrieveProvider } from '@/context/movie/retrieve'

export default function MovieDetail() {
    return (
        <MovieRetrieveProvider>
            <BaseMovieRetrieveContent />
        </MovieRetrieveProvider>
    )
}

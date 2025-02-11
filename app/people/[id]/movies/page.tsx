// ** Components Imports
import BaseMovieRetrieveCredits from '@/components/pages/people/retrieve'

// ** Context Imports
import { PeopleRetrieveProvider } from '@/context/people/retrieve'

export default function PeopleMovies() {
    return (
        <PeopleRetrieveProvider>
            <BaseMovieRetrieveCredits />
        </PeopleRetrieveProvider>
    )
}

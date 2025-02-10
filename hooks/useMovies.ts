'use client'

// ** Next Imports
import { useParams } from 'next/navigation'

// ** Third Party Imports
import { useQuery } from '@tanstack/react-query'

// ** Lib Imports
import { returnFetch } from '@/lib/return-fetch'

// ** Types Imports
import { IMovies } from '@/types/movies'

const queryKey = {
    movieDetail: 'movie-detail'
}

export const useDiscoverDetail = () => {
    const params = useParams()

    return useQuery<IMovies>({
        queryKey: [queryKey.movieDetail, params.id],
        queryFn: () => returnFetch(`/movie/${params.id}`, {
            params: {
                append_to_response: 'credits,keywords,images,reviews'
            }
        })
            .then((response) => response.json())
    })
}

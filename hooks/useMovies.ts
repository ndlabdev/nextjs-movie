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

export const useDiscoverDetail = (type: 'movie' | 'tv') => {
    const params = useParams()

    return useQuery<IMovies>({
        queryKey: [queryKey.movieDetail, params.id],
        queryFn: () => returnFetch(`/${type}/${params.id}`, {
            params: {
                append_to_response: 'credits,keywords,images,reviews,recommendations'
            }
        })
            .then((response) => response.json())
    })
}

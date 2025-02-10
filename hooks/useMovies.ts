'use client'

// ** Next Imports
import { useParams } from 'next/navigation'

// ** Third Party Imports
import { useQuery } from '@tanstack/react-query'

// ** Lib Imports
import { returnFetch } from '@/lib/return-fetch'

// ** Types Imports

const queryKey = {
    movieDetail: 'movie-detail',
    movieImages: 'movie-images',
    movieKeywords: 'movie-keywords'
}

export const useDiscoverDetail = () => {
    const params = useParams()

    const retrieve = useQuery<ITrendingMovies>({
        queryKey: [queryKey.movieDetail, params.id],
        queryFn: () => returnFetch(`/movie/${params.id}`, {
            params: {
                append_to_response: 'credits'
            }
        })
            .then((response) => response.json())
    })

    const { data: images } = useQuery<ITrendingMovies>({
        queryKey: [queryKey.movieImages, params.id],
        queryFn: () => returnFetch(`/movie/${params.id}/images`)
            .then((response) => response.json())
    })

    const { data: keywords } = useQuery<ITrendingMovies>({
        queryKey: [queryKey.movieKeywords, params.id],
        queryFn: () => returnFetch(`/movie/${params.id}/keywords`)
            .then((response) => response.json())
    })

    return {
        ...retrieve,
        images,
        keywords
    }
}

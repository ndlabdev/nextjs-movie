'use client'

// ** Next Imports
import { useParams } from 'next/navigation'

// ** React Imports
import { useState } from 'react'

// ** Third Party Imports
import { useQuery } from '@tanstack/react-query'

// ** Lib Imports
import { returnFetch } from '@/lib/return-fetch'

// ** Types Imports
import { IMovies, SearchMovie } from '@/types/movies'

const queryKey = {
    movieDetail: 'movie-detail',
    movieSearch: 'movie-search'
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

export const useMovieSearch = () => {
    const [search, setSearch] = useState<string>()

    const data = useQuery<SearchMovie>({
        queryKey: [queryKey.movieSearch, search],
        queryFn: () => returnFetch('/search/multi', {
            params: {
                query: search
            }
        })
            .then((response) => response.json()),
        enabled: !!search
    })

    return {
        ...data,
        search,
        setSearch
    }
}

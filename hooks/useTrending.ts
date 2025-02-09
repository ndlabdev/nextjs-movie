// ** Third Party Imports
import { useQuery } from '@tanstack/react-query'

// ** Lib Imports
import { returnFetch } from '@/lib/return-fetch'

// ** Types Imports
import { ITrendingMovies } from '@/types/trending-movies'

const queryKey = {
    index: 'trending-movies'
}

export const useTrendingMovies = () => {
    return useQuery<ITrendingMovies>({
        queryKey: [queryKey.index],
        queryFn: () => returnFetch('/trending/movie/day')
            .then((response) => response.json())
    })
}

// ** Third Party Imports
import { useQuery } from '@tanstack/react-query';

// ** Lib Imports
import { returnFetch } from '@/lib/return-fetch';

const queryKey = {
    index: 'trending-movies'
}

export const useTrendingMovies = () => {
    return useQuery({
        queryKey: [queryKey.index],
        queryFn: () => returnFetch('/trending/movie/day')
            .then((response) => response.json())
    })
}

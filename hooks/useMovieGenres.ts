// ** Third Party Imports
import { useQueries, useQuery } from '@tanstack/react-query'

// ** Lib Imports
import { returnFetch } from '@/lib/return-fetch'

// ** Types Imports
import { IMovieGenres } from '@/types/genres'
import { ITrendingMovies } from '@/types/trending-movies'

const queryKey = {
    genresMovie: 'genres-movie',
    discoverMovie: 'discover-movie'
}

export const useMovieGenres = () => {
    const { data: genres } = useQuery<IMovieGenres>({
        queryKey: [queryKey.genresMovie],
        queryFn: () => returnFetch('/genre/movie/list').then(res => res.json())
    })
    
    const selectedGenres = genres?.genres.slice(0, 7) || []

    const results = useQueries({
        queries: selectedGenres.map((genre) => ({
            queryKey: [queryKey.discoverMovie, genre.id],
            queryFn: () => returnFetch('/discover/movie', {
                params: {
                    with_genres: genre.id,
                    sort_by: 'popularity.desc'
                }
            })
                .then((response) => response.json())
        }))
    })

    return results.map((result, index) => ({
        categoryId: selectedGenres[index].id,
        categoryName: selectedGenres[index].name,
        movies: (result.data as ITrendingMovies)?.results.slice(0, 15) || []
    })).filter(category => category.movies.length > 0)
}

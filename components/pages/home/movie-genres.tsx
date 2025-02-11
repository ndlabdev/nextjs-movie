'use client'

// ** Components Imports
import BaseMovieCarousel from '@/components/base/movie/carousel'

// ** Hooks Imports
import { useMovieGenres } from '@/hooks/useMovieGenres'

export default function HomeMovieGenres() {
    const movieGenres = useMovieGenres()

    return (
        <>
            {movieGenres.map(item => (
                <BaseMovieCarousel
                    key={item.categoryId}
                    isMovie
                    categoryName={item.categoryName}
                    movies={item.movies}
                />
            ))}
        </>
    )
}

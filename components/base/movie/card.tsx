// ** Next Imports
import Link from 'next/link'

// ** Icons Imports
import { Star } from 'lucide-react'

// ** Components Imports
import BaseImage from '@/components/base/image'

// ** Types Imports
import { IMoviesResult } from '@/types/trending-movies'

// ** Interface
interface Props {
    isMovie?: boolean
    movie: IMoviesResult
}

export default function BaseMovieCard({ movie, isMovie }: Props) {
    return (
        <>
            <div className='group relative'>
                <Link href={`/${isMovie ? 'movies' : 'tv-series'}/${movie.id}`}>
                    <BaseImage image={movie.backdrop_path} name={movie.title || movie.name} />
                </Link>

                <div className='pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10' />
            </div>

            <div className="mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
                <a
                    className="text-inherit hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors text-base font-medium"
                    href={`/${isMovie ? 'movies' : 'tv-series'}/${movie.id}`}
                >
                    {movie.title || movie.name}
                </a>
            </div>

            <div>
                <div className="flex flex-shrink-0 items-center gap-1 whitespace-nowrap text-sm">
                    <Star className='text-primary fill-primary' size={16} />
                    <span>{movie.vote_average} / 10</span>
                </div>
            </div>
        </>
    )
}

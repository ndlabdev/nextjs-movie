// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** Icons Imports
import { Star, Film } from 'lucide-react'

// ** Types Imports
import { IMoviesResult } from '@/types/trending-movies'

interface Props {
    movie: IMoviesResult
}

export default function BaseMovieCard({ movie }: Props) {
    return (
        <>
            <div className='group relative'>
                <Link href={`/movies/${movie.id}`}>
                    {movie.backdrop_path ? (
                        <Image
                            alt={movie.title}
                            className="mb-1 rounded w-full aspect-video object-cover block"
                            decoding="async"
                            draggable={false}
                            height={500}
                            loading="lazy"
                            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                            title={movie.title}
                            width={500}
                        />
                    ) : (
                        <div className="h-full w-full rounded bg-black/40 object-cover flex items-center justify-center overflow-hidden">
                            <Film />
                        </div>
                    )}
                </Link>

                <div className='pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10' />
            </div>

            <div className="mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
                <a
                    className="text-inherit hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors text-base font-medium"
                    href={`/movies/${movie.id}`}
                >
                    {movie.title}
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

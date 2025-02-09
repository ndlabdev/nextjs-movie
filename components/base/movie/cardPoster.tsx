// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** Icons Imports
import { Star } from 'lucide-react'

// ** Types Imports
import { ITVSeries } from '@/types/tv-series'

interface Props {
    movie: ITVSeries
}

export default function BaseMovieCard({ movie }: Props) {
    return (
        <>
            <div className='group relative'>
                <Link href='/'>
                    <Image
                        alt={movie.name}
                        className="mb-1 rounded w-full object-cover block"
                        decoding="async"
                        draggable={false}
                        height={300}
                        loading="lazy"
                        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                        title={movie.name}
                        width={300}
                    />
                </Link>

                <div className='pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10' />
            </div>

            <div className="mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
                <a
                    className="text-inherit hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors text-base font-medium"
                    href="/titles/781/venom-the-last-dance"
                >
                    {movie.name}
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

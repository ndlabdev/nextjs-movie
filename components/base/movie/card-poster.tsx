// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** Icons Imports
import { Star, Film } from 'lucide-react'

// ** Types Imports
import { IDiscover } from '@/types/discover'

// ** Utils Imports
import { showImage } from '@/utils/helpers'

// ** Interface
interface Props {
    link: string
    movie: IDiscover
}

export default function BaseMovieCard({ link, movie }: Props) {
    return (
        <>
            <div className='group relative'>
                <Link href={`/${link}/${movie.id}`}>
                    {movie.poster_path ? (
                        <Image
                            alt={movie.name as string}
                            className="mb-1 rounded w-full object-cover block aspect-poster"
                            decoding="async"
                            draggable={false}
                            height={300}
                            loading="lazy"
                            src={showImage(movie.poster_path)}
                            title={movie.name}
                            width={300}
                        />
                    ) : (
                        <div className="h-full w-full rounded bg-black/40 object-cover flex items-center justify-center overflow-hidden aspect-poster">
                            <Film size={36} />
                        </div>
                    )}
                </Link>

                <div className='pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10' />
            </div>

            <div className="mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
                <Link
                    className="text-inherit hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors text-base font-medium"
                    href={`/${link}/${movie.id}`}
                >
                    {movie.name}
                </Link>
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

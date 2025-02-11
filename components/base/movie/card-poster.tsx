// ** Next Imports
import Link from 'next/link'

// ** Icons Imports
import { Star } from 'lucide-react'

// ** Components Imports
import BaseImage from '@/components/base/image'

// ** Types Imports
import { IDiscover } from '@/types/discover'

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
                    <BaseImage aspect='poster' image={movie.poster_path} name={movie.name!} />
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

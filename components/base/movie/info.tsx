// ** Next Imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ** Icons Imports
import { Star } from 'lucide-react'

// ** Utils Imports
import { formattedDate, formatDuration } from '@/utils/helpers'

// ** Components Imports
import BaseImage from '@/components/base/image'

// ** Types Imports
import { IMovies } from '@/types/movies'

// ** Interface
interface Props {
    data: IMovies
}

export default function MovieInfo({ data }: Props) {
    const pathname = usePathname()
    const baseUrl = pathname.split('/').slice(0, -1).join('/')

    return (
        <div className="mb-6 items-center justify-between gap-6 lg:flex">
            {/* Poster Image */}
            <div className="w-20 aspect-poster group relative flex-shrink-0">
                <Link href={baseUrl}>
                    <BaseImage aspect="poster" image={data?.poster_path} name={data?.title || data?.name} />
                    <span className='pointer-events-none absolute inset-0 block bg-black opacity-0 transition-opacity group-hover:opacity-10' />
                </Link>
            </div>
    
            {/* Title & Release Info */}
            <div className='flex-auto'>
                <h1 className='mb-3 text-4xl md:mb-2 md:text-5xl'>
                    <Link className='text-inherit hover:underline' href={baseUrl}>
                        {data?.title || data?.name}
                    </Link>
                </h1>
    
                <div className="text-base font-normal flex items-center gap-4">
                    {data?.release_date || data?.first_air_date ? (
                        <span>{formattedDate(data.release_date || data.first_air_date)}</span>
                    ) : null}
    
                    {data?.runtime && <><span>•</span><span>{formatDuration(data.runtime)}</span></>}
                </div>
            </div>
    
            {/* Ratings */}
            <div className='flex items-center justify-between gap-2 max-md:mt-2'>
                <div className='flex min-w-[243px] items-center text-base'>
                    <div className="flex items-center gap-1 text-sm">
                        <Star className='text-primary fill-primary' size={16} />
                        <span>{data?.vote_average} / 10</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

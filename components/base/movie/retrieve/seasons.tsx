'use client'

// ** Next Imports
import Link from 'next/link'

// ** Components Imports
import BaseTitle from '@/components/base/title'
import BaseImage from '@/components/base/image'

// ** Utils Imports
import { getYear } from '@/utils/helpers'

// ** Types Imports
import { IMovies } from '@/types/movies'

// ** Interface
interface Props {
    data: IMovies
}

export default function BaseMovieRetrieveSeasons({ data }: Props) {
    if (!data?.seasons?.length) return null

    return (
        <section>
            <div className='mb-5'>
                <BaseTitle title='Seasons' />
            </div>

            <div className='grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8'>
                {data.seasons.map(item => (
                    <div key={item.id} className='flex flex-col'>
                        <Link className='text-inherit hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors flex-shrink-0' href='/'>
                            <BaseImage aspect='poster' image={item.poster_path} name={item.name} />
                        </Link>

                        <div className='flex flex-col gap- 1 mt-1'>
                            <Link className='text-inherit hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors text-sm' href='/'>
                                {item.name}
                            </Link>
                            
                            <span className='text-tiny text-default-500'>{getYear(item.air_date)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

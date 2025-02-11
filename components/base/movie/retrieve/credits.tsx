'use client'

// ** Next Imports
import Link from 'next/link'

// ** React Imports
import { useState } from 'react'

// ** HeroUI Imports
import { Button } from '@heroui/react'

// ** Icons Imports
import { Star } from 'lucide-react'

// ** Components Imports
import BaseTitle from '@/components/base/title'
import BaseImage from '@/components/base/image'

// ** Utils Imports
import { formattedDate, formatDuration } from '@/utils/helpers'

// ** Context Imports
import { useMovieRetrieveContext } from '@/context/movie/retrieve'

// ** Interface
interface Props {
    type?: 'movie' | 'tv'
}

export default function BaseMovieRetrieveCredits({ type = 'movie' }: Props) {
    // ** useHooks
    const [showCast, setShowCast] = useState<boolean>(true)
    const [showCrew, setShowCrew] = useState<boolean>(true)
    const data = useMovieRetrieveContext()
    const isMovie = type === 'movie'

    const groupByJob = (arr: any[]) => {
        return arr.reduce((acc, item) => {
            if (!acc[item.job]) {
                acc[item.job] = []
            }
            acc[item.job].push(item)

            return acc
        }, {} as Record<string, typeof arr>)
    }

    const groupedByJob = groupByJob(data.credits.crew)

    console.log(groupedByJob)

    return (
        <div className="container mx-auto mt-6 px-3 md:mt-10 md:px-6">
            <div className="mb-6 items-center justify-between gap-6 lg:flex">
                <div className="w-20 aspect-poster group relative flex-shrink-0">
                    <Link href='/'>
                        <BaseImage aspect='poster' image={data.poster_path} name={data.title || data.name} />
                        <span className='pointer-events-none absolute inset-0 block bg-black opacity-0 transition-opacity group-hover:opacity-10' />
                    </Link>
                </div>

                <div className='flex-auto'>
                    <h1 className='mb-3 text-4xl md:mb-2 md:text-5xl'>
                        <Link className='text-inherit hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors' href='/'>
                            {data.title || data.name}
                        </Link>
                    </h1>

                    <div className="text-base font-normal flex items-center gap-4 overflow-hidden">
                        {data.release_date || data.first_air_date && <span>{formattedDate(data.release_date || data.first_air_date)}</span>}
                        {data.runtime && (
                            <>
                                <span>•</span>
                                <span>{formatDuration(data.runtime || 0)}</span>
                            </>
                        )}
                    </div>
                </div>

                <div className='flex items-center justify-between gap-2 max-md:mt-2 max-md:flex-wrap'>
                    <div className='flex min-w-[243px] flex-shrink-0 items-center text-base'>
                        <div className="flex flex-shrink-0 items-center gap-1 whitespace-nowrap text-sm">
                            <Star className='text-primary fill-primary' size={16} />
                            <span>{data.vote_average} / 10</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-12 @container'>
                <section className='mb-10'>
                    <BaseTitle title={`Cast (${data.credits.cast.length})`}>
                        <Button onPress={() => setShowCast(prev => !prev)}>
                            {showCast ? 'Hide' : 'Show'}
                        </Button>
                    </BaseTitle>
                </section>

                {showCast && (
                    <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-6'>
                        {data.credits.cast.map(item => (
                            <div key={item.id} className='flex flex-col gap-1'>
                                <Link href={'/'}>
                                    <BaseImage aspect='square' image={item.profile_path} name={item.name} />
                                </Link>

                                <div className='flex flex-col'>
                                    <Link className='text-base' href={'/'}>{item.name}</Link>
                                    <small className='text-sm text-default-500'>{item.character}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <section className='mb-10'>
                    <BaseTitle title={`Crew (${data.credits.crew.length})`}>
                        <Button onPress={() => setShowCrew(prev => !prev)}>
                            {showCrew ? 'Hide' : 'Show'}
                        </Button>
                    </BaseTitle>
                </section>

                {showCrew && (
                    <section className='mb-10 space-y-6'>
                        {Object.entries(groupedByJob).map(([job, people]) => (
                            <div key={job}>
                                <h2 className="text-lg font-bold mb-2">{job}</h2>

                                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-6">
                                    {people.map(person => (
                                        <div key={`${person.id}-${person.job}`} className='flex flex-col gap-1'>
                                            <Link href={'/'}>
                                                <BaseImage aspect="square" image={person.profile_path} name={person.name} />
                                            </Link>

                                            <div className="flex flex-col">
                                                <Link className="text-base" href={'/'}>{person.name}</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    )
}

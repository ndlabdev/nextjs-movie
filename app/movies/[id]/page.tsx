'use client'

// ** Next Imports
// import Link from 'next/link'
import Image from 'next/image'

// ** Icons Imports
import { Play, Plus } from 'lucide-react'

// ** HeroUI Imports
import { Link, Button, Chip, Divider } from '@heroui/react'

// ** Hooks Imports
import { useDiscoverDetail } from '@/hooks/useMovies'

// ** Utils Imports
import { formattedDate, formatDuration, formatCurrency } from '@/utils/helpers'

// ** Components Imports
import BaseTitle from '@/components/base/title'

export default function Movie() {
    const { data, images, keywords } = useDiscoverDetail()

    if (!data) return null

    console.log(data, images)

    const directors = data.credits.crew.filter(person => person.department === 'Directing').slice(0, 3)
    const writers = data.credits.crew.filter(person => person.department === 'Writing').slice(0, 3)
    const keywordList = keywords?.keywords?.slice(0, 5) || []

    return (
        <div className="container mx-auto mt-6 px-3 md:mt-10 md:px-6">
            <div className="items-start gap-14 md:flex">
                <div className="top-10 flex-shrink-0 md:sticky md:w-1/4 max-lg:hidden">
                    <div className="relative">
                        <div className="w-full aspect-poster group relative">
                            <Image
                                alt={data.title}
                                className="mb-1 rounded w-full object-cover block"
                                decoding="async"
                                draggable={false}
                                height={300}
                                loading="lazy"
                                src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
                                title={data.title}
                                width={300}
                            />

                            <span className='pointer-events-none absolute inset-0 block bg-black opacity-0 transition-opacity group-hover:opacity-10' />
                        </div>
                    </div>
                    
                    <div className='flex-auto max-md:ml-4 max-md:text-sm'>
                        <Button
                            fullWidth
                            as={Link}
                            className='mt-3'
                            color='primary'
                            startContent={<Play className='fill-white' size={18} />}
                        >
                            Watch now
                        </Button>

                        <Button
                            fullWidth
                            as={Link}
                            className='mt-3'
                            startContent={<Plus size={18} />}
                            variant='ghost'
                        >
                            Add to watchlist
                        </Button>

                        <ul className='mt-4 space-y-4'>
                            <li className='flex flex-col gap-1'>
                                <strong>Budget</strong>
                                <span>{formatCurrency(data.budget)}</span>
                            </li>

                            <li className='flex flex-col gap-1'>
                                <strong>Revenue</strong>
                                <span>{formatCurrency(data.revenue)}</span>
                            </li>

                            <li className='flex flex-col gap-1'>
                                <strong>Production countries</strong>
                                <div className='flex items-center gap-2 flex-wrap'>
                                    {data.production_countries.map(({ iso_3166_1, name }) => (
                                        <Chip key={iso_3166_1} size="sm">{name}</Chip>
                                    ))}
                                </div>
                            </li>

                            <li className='flex flex-col gap-1'>
                                <strong>Keywords</strong>
                                <div className='flex items-center gap-2 flex-wrap'>
                                    {keywordList.slice(0, 5).map(({ id, name }) => (
                                        <Chip key={id} size="sm">{name}</Chip>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='flex-auto'>
                    <div className='mb-6 items-center justify-between gap-6 lg:flex'>
                        <div className='flex-auto'>
                            <h1 className='mb-3 text-4xl md:mb-2 md:text-5xl'>
                                {data.title}
                            </h1>

                            <div className='text-base font-normal'>
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div>{formattedDate(data.release_date)}</div>
                                    <div>•</div>
                                    <div>{formatDuration(data.runtime)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        {data.genres.map(({ id, name }) => (
                            <Chip key={id} size="sm">{name}</Chip>
                        ))}
                    </div>

                    <blockquote className='mt-4'>“{data.tagline}”</blockquote>

                    <p className='relative mt-4 max-h-40 overflow-hidden'>{data.overview}</p>

                    <Divider className="my-4" />

                    <ul className='mt-4 space-y-4'>
                        <li className='flex gap-2'>
                            <strong className='min-w-20'>Directors</strong>
                            <div className='flex items-center gap-2 flex-wrap'>
                                {directors.map(item => (
                                    <Chip key={item.id} size="sm">{item.name}</Chip>
                                ))}
                            </div>
                        </li>

                        <li className='flex gap-2'>
                            <strong className='min-w-20'>Writers</strong>
                            <div className='flex items-center gap-2 flex-wrap'>
                                {writers.map(item => (
                                    <Chip key={item.id} size="sm">{item.name}</Chip>
                                ))}
                            </div>
                        </li>
                    </ul>

                    {}
                    <section className="mb-4 md:mb-7 mt-12">
                        <BaseTitle title='Images' />
                        
                        <div className='grid grid-cols-3 gap-12 md:grid-cols-5 md:gap-6'>
                            <Image
                                alt={data.title}
                                className="aspect-square w-full cursor-pointer rounded object-cover"
                                decoding="async"
                                draggable={false}
                                height={300}
                                loading="lazy"
                                src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
                                title={data.title}
                                width={300}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

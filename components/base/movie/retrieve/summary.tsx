'use client'

// ** Next Imports
import Image from 'next/image'

// ** Icons Imports
import { Play, Plus } from 'lucide-react'

// ** HeroUI Imports
import { Link, Button, Chip } from '@heroui/react'

// ** Utils Imports
import { formatCurrency, showImage } from '@/utils/helpers'

// ** Types Imports
import { IMovies } from '@/types/movies'

// ** Interface
interface Props {
    data: IMovies
}

export default function BaseMovieRetrieveSummary({ data }: Props) {
    const keywordList = data.keywords?.keywords?.slice(0, 5) || []

    return (
        <>
            <div className="relative">
                <div className="w-full aspect-poster group relative">
                    <Image
                        alt={data.title}
                        className="mb-1 rounded w-full object-cover block"
                        decoding="async"
                        draggable={false}
                        height={300}
                        loading="lazy"
                        src={showImage(data.poster_path)}
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
                    {data.budget > 0 && (
                        <li className='flex flex-col gap-1'>
                            <strong>Budget</strong>
                            <span>{formatCurrency(data.budget)}</span>
                        </li>
                    )}

                    {data.revenue > 0 && (
                        <li className='flex flex-col gap-1'>
                            <strong>Revenue</strong>
                            <span>{formatCurrency(data.revenue)}</span>
                        </li>
                    )}

                    {data.production_countries.length > 0 && (
                        <li className='flex flex-col gap-1'>
                            <strong>Production countries</strong>
                            <div className='flex items-center gap-2 flex-wrap'>
                                {data.production_countries.map(({ iso_3166_1, name }) => (
                                    <Chip key={iso_3166_1} size="sm">{name}</Chip>
                                ))}
                            </div>
                        </li>
                    )}

                    {keywordList.length > 0 && (
                        <li className='flex flex-col gap-1'>
                            <strong>Keywords</strong>
                            <div className='flex items-center gap-2 flex-wrap'>
                                {keywordList.slice(0, 5).map(({ id, name }) => (
                                    <Chip key={id} size="sm">{name}</Chip>
                                ))}
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

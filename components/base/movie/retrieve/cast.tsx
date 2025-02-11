'use client'

// ** Next Imports
import NextLink from 'next/link'

// ** HeroUI Imports
import { Button, Link } from '@heroui/react'

// ** Icons Imports
import { ChevronRight } from 'lucide-react'

// ** Components Imports
import BaseImage from '../../image'
import BaseTitle from '@/components/base/title'

// ** Types Imports
import { IMovies } from '@/types/movies'

// ** Interface
interface Props {
    data: IMovies
    link?: string
}

export default function BaseMovieRetrieveCast({ data, link = '/' }: Props) {
    const castList = data.credits.cast.length ? data.credits.cast.slice(0, 5) : []

    if (!castList.length) return null

    return (
        <section>
            <div className='mb-5'>
                <BaseTitle title='Cast'>
                    <Button
                        as={Link}
                        endContent={<ChevronRight size={18} />}
                        href={`/${link}/${data.id}/credits`}
                        variant="flat"
                    >
                        View More
                    </Button>
                </BaseTitle>
            </div>
                        
            <div className='grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-6'>
                {castList.map(item => (
                    <div key={item.id} className='flex flex-col gap-1'>
                        <NextLink href={`/people/${item.id}`}>
                            <BaseImage aspect='square' image={item.profile_path} name={item.name} />
                        </NextLink>

                        <div className='flex flex-col'>
                            <NextLink className='text-base' href={`/people/${item.id}`}>{item.name}</NextLink>
                            <small className='text-sm text-default-500'>{item.character}</small>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

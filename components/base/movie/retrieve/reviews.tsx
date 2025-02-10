'use client'

// ** Next Imports
import NextLink from 'next/link'

// ** Icons Imports
import { Star } from 'lucide-react'

// ** HeroUI Imports
import { Avatar } from '@heroui/react'

// ** Utils Imports
import { showImage } from '@/utils/helpers'

// ** Components Imports
import BaseTitle from '@/components/base/title'

// ** Types Imports
import { IMovies } from '@/types/movies'

// ** Interface
interface Props {
    data: IMovies
}

export default function BaseMovieRetrieveReviews({ data }: Props) {
    if (!data.reviews.total_results) return null

    return (
        <section>
            <div className='mb-5'>
                <BaseTitle title={`Reviews (${data.reviews.total_results})`} />
            </div>
                        
            <div className='space-y-4'>
                {data.reviews.results.map(item => (
                    <div key={item.id} className='group flex min-h-20 items-start gap-4 rounded'>
                        <NextLink className='relative block overflow-hidden select-none flex-shrink-0 w-15 h-15 rounded-full' href='/'>
                            <Avatar size='lg' src={showImage(item.author_details.avatar_path)} />
                        </NextLink>

                        <div className='flex-auto'>
                            <div className='mb-1 flex items-center gap-2'>
                                <NextLink className='hover:underline flex items-center gap-2 text-base font-medium' href='/'>
                                    {item.author}
                                </NextLink>
                            </div>

                            <div className="flex flex-shrink-0 items-center gap-1 whitespace-nowrap my-2">
                                <Star className='text-primary fill-primary' size={16} />
                                <span>{item.author_details.rating} / 10</span>
                            </div>

                            <div dangerouslySetInnerHTML={{ __html: item.content }} className='whitespace-break-spaces' />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

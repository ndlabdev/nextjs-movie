'use client'

// ** Next Imports
import NextLink from 'next/link'

// ** HeroUI Imports
import { Button, Link } from '@heroui/react'

// ** Icons Imports
import { ChevronRight } from 'lucide-react'

// ** Components Imports
import BaseImage from '@/components/base/image'
import BaseTitle from '@/components/base/title'

// ** Context Imports
import { usePeopleRetrieveContext } from '@/context/people/retrieve'

// ** Utils Imports
import { formattedDate, getGender } from '@/utils/helpers'

export default function BasePeopleRetrieveRetrieve() {
    // ** useHooks
    const data = usePeopleRetrieveContext()

    return (
        <div className="container mx-auto mt-6 px-3 md:mt-10 md:px-6">
            <div className="items-start gap-14 md:flex">
                <div className="top-10 flex-shrink-0 md:sticky md:w-1/4 max-md:flex">
                    <BaseImage
                        responsive
                        aspect='poster'
                        image={data.profile_path}
                        name={data.name}
                    />

                    <div className='flex-auto max-md:ml-4 max-md:text-sm'>
                        <ul className='mt-3 md:mt-6 space-y-4'>
                            <li className='flex flex-col gap-1'>
                                <strong>Known for</strong>
                                <span>{data.known_for_department}</span>
                            </li>

                            <li className='flex flex-col gap-1'>
                                <strong>Gender</strong>
                                <span>{getGender(data.gender)}</span>
                            </li>

                            <li className='flex flex-col gap-1'>
                                <strong>Born</strong>
                                <span>{formattedDate(data.birthday)}</span>
                            </li>

                            <li className='flex flex-col gap-1'>
                                <strong>Birthplace</strong>
                                <span>{data.place_of_birth}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='flex-auto space-y-4'>
                    <h1 className='text-4xl md:mb-8 md:text-5xl'>
                        {data.name}
                    </h1>

                    <BaseTitle title='Biography' />

                    <div className='relative text-sm'>
                        <div>
                            {data.biography.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <section>
                        <div className='mb-5 mt-12'>
                            <BaseTitle title='Movie Credits'>
                                <Button
                                    as={Link}
                                    endContent={<ChevronRight size={18} />}
                                    href={`/people/${data.id}/movies`}
                                    variant="flat"
                                >
                                    View More
                                </Button>
                            </BaseTitle>
                        </div>

                        <div className='grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-6 mt-4'>
                            {data.movie_credits.cast.map(item => (
                                <div key={item.id} className='flex flex-col gap-1'>
                                    <NextLink href={`/movies/${item.id}`}>
                                        <BaseImage aspect='poster' image={item.poster_path} name={item.title} />
                                    </NextLink>

                                    <div className='flex flex-col'>
                                        <NextLink className='text-base line-clamp-2' href={`/movies/${item.id}`}>{item.title}</NextLink>
                                        <small className='text-sm text-default-500'>{item.character}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

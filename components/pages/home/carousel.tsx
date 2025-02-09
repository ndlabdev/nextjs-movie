'use client'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** Next Imports
import { useState } from 'react'

// ** HeroUI Imports
import {Button} from '@heroui/react'

// ** Icons Imports
import { Play, Star, ChevronLeft, ChevronRight } from 'lucide-react'

// ** Hooks Imports
import { useTrendingMovies } from '@/hooks/useTrending'

export default function HomeCarousel() {
    const { data } = useTrendingMovies()
    const [currentIndex, setCurrentIndex] = useState(0)

    if (!data?.results) return null

    const movies = data.results || []
    const totalMovies = movies.length

    const nextMovie = () => {
        setCurrentIndex((prev) => (prev + 1) % totalMovies)
    }

    const prevMovie = () => {
        setCurrentIndex((prev) => (prev - 1 + totalMovies) % totalMovies)
    }

    const getUpNextMovies = () => {
        const upNext = []

        for (let i = 1; i <= 3; i++) {
            const index = (currentIndex + i) % totalMovies

            upNext.push(movies[index])
        }

        return upNext
    }

    return (
        <div className="container mx-auto p-3 @container md:p-6">
            <div className="mb-10 md:mb-13">
                <div className="gap-6 md:flex">
                    <div className="relative flex-auto">
                        <div className='flex h-full select-none snap-x snap-mandatory snap-always items-center overflow-x-auto'>
                            {movies.length > 0 && (
                                <div className='relative h-full w-full flex-shrink-0 snap-start snap-normal overflow-hidden rounded'>
                                    <div className='group relative h-full'>
                                        <Image
                                            alt={movies[currentIndex].title}
                                            className="min-h-60 md:min-h-0 aspect-video object-cover block"
                                            decoding="async"
                                            draggable={false}
                                            height={720}
                                            loading="lazy"
                                            sizes="100vw"
                                            src={`https://image.tmdb.org/t/p/w1280/${movies[currentIndex].backdrop_path}`}
                                            title={movies[currentIndex].title}
                                            width={1280}
                                        />
                                    </div>

                                    <div className='absolute inset-0 isolate flex h-full w-full items-center justify-start gap-6 rounded p-7 text-white md:items-end'>
                                        <div className='absolute left-0 h-full w-full bg-gradient-to-b from-black/40 max-md:top-0 md:bottom-0 md:h-3/4 md:bg-gradient-to-t md:from-black/100' />

                                        <div className='max-h-80 h-full aspect-poster z-10 shadow-md max-md:hidden group relative flex-shrink-0'>
                                            <Link href='/'>
                                                <Image
                                                    alt={movies[currentIndex].title}
                                                    className='h-full w-full rounded bg-fg-base/4 object-cover block'
                                                    decoding='async'
                                                    draggable={false}
                                                    height={300}
                                                    loading="lazy"
                                                    src={`https://image.tmdb.org/t/p/w300/${movies[currentIndex].poster_path}`}
                                                    title={movies[currentIndex].title}
                                                    width={300}
                                                />

                                                <span className='pointer-events-none absolute inset-0 block bg-black opacity-0 transition-opacity group-hover:opacity-10' />
                                            </Link>
                                        </div>

                                        <div className='z-10 text-lg md:max-w-xl'>
                                            <div className='flex flex-shrink-0 items-center gap-1 whitespace-nowrap'>
                                                <Star className='text-primary fill-primary' size={20} />
                                                <span>{movies[currentIndex].vote_average} / 10</span>
                                            </div>

                                            <div className='my-2 text-2xl md:text-5xl'>
                                                <Link className='text-inherit hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors' href='/'>
                                                    {movies[currentIndex].title}                                                    
                                                </Link>
                                            </div>

                                            <p className='max-md:hidden line-clamp-4'>
                                                {movies[currentIndex].overview}
                                            </p>

                                            <Button
                                                className='focus-visible:ring text-on-primary bg-primary border border-primary hover:bg-primary-dark hover:border-primary-dark disabled:text-disabled disabled:bg-disabled disabled:border-transparent disabled:shadow-none whitespace-nowrap inline-flex align-middle flex-shrink-0 items-center transition-button duration-200 select-none appearance-none no-underline outline-none disabled:pointer-events-none disabled:cursor-default rounded-full justify-center font-semibold text-sm h-9 px-3 mt-4 md:min-h-10 md:min-w-36'
                                                color="primary"
                                                startContent={<Play className='fill-white' size={16} />}
                                            >
                                                Watch now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='absolute top-2 z-5 w-full md:top-[170px]'>
                            <div className='absolute left-2 hidden md:left-7 md:block'>
                                <Button
                                    isIconOnly
                                    size='lg'
                                    startContent={<ChevronLeft />}
                                    onPress={prevMovie}
                                />
                            </div>

                            <div className='absolute right-2 hidden md:right-7 md:block'>
                                <Button
                                    isIconOnly
                                    size='lg'
                                    startContent={<ChevronRight />}
                                    onPress={nextMovie}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='w-1/4 max-w-52 flex-shrink-0 max-md:hidden'>
                        <h4 className='mb-3 text-lg font-semibold'>Up Next</h4>

                        <div className='flex flex-col gap-6'>
                            {getUpNextMovies().map(movie => (
                                <div key={movie.id} className='relative flex-auto'>
                                    <div className='group relative'>
                                        <Link href='/'>
                                            <Image
                                                alt={movie.title}
                                                className="mb-1 rounded w-full aspect-video object-cover block"
                                                decoding="async"
                                                draggable={false}
                                                height={300}
                                                loading="lazy"
                                                src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
                                                title={movie.title}
                                                width={300}
                                            />
                                        </Link>
                                    </div>

                                    <div className="mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
                                        <a
                                            className="text-inherit hover:underline outline-none focus-visible:underline overflow-x-hidden overflow-ellipsis transition-colors text-base font-medium"
                                            href="/titles/781/venom-the-last-dance"
                                        >
                                            {movie.title}
                                        </a>
                                    </div>

                                    <div>
                                        <div className="flex flex-shrink-0 items-center gap-1 whitespace-nowrap text-sm">
                                            <Star className='text-primary fill-primary' size={16} />
                                            <span>{movie.vote_average} / 10</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

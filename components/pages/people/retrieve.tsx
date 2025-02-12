'use client'

// ** Next Imports
import NextLink from 'next/link'

// ** Components Imports
import BaseImage from '@/components/base/image'
import BaseTitle from '@/components/base/title'

// ** Context Imports
import { usePeopleRetrieveContext } from '@/context/people/retrieve'

// ** Utils Imports
import { formattedDate, getGender } from '@/utils/helpers'

// ** Component
export default function BasePeopleRetrieveRetrieve() {
    const data = usePeopleRetrieveContext()

    // Memoize derived values
    const movieCredits = data.movie_credits.cast.filter(Boolean)
    const biography = data.biography?.split('\n\n') ?? []

    return (
        <div className="container mx-auto mt-6 px-3 md:mt-10 md:px-6">
            <div className="items-start gap-14 md:flex">
                {/* Sidebar */}
                <aside className="top-10 flex-shrink-0 md:sticky md:w-1/4 max-md:flex">
                    <BaseImage responsive aspect="poster" image={data.profile_path} name={data.name} />

                    <div className="flex-auto max-md:ml-4 max-md:text-sm">
                        <ul className="mt-3 md:mt-6 space-y-4">
                            {renderListItem('Known for', data.known_for_department)}
                            {renderListItem('Gender', getGender(data.gender))}
                            {renderListItem('Born', data.birthday && formattedDate(data.birthday))}
                            {renderListItem('Birthplace', data.place_of_birth)}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-auto space-y-4">
                    <h1 className="text-4xl md:mb-8 md:text-5xl">{data.name}</h1>

                    {/* Biography Section */}
                    {biography.length > 0 && (
                        <section className='space-y-4'>
                            <BaseTitle title="Biography" />

                            <div className="relative text-sm space-y-4">
                                {biography.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Movie Credits Section */}
                    {movieCredits.length > 0 && (
                        <section className="mt-12 space-y-4">
                            <BaseTitle title="Movie Credits" />

                            <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-6 mt-4">
                                {movieCredits.map((item) => (
                                    <MovieCredit key={item.id} movie={item} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    )
}

// ** Helper Functions **
const renderListItem = (label: string, value?: string | null) => {
    return value ? (
        <li className="flex flex-col gap-1">
            <strong>{label}</strong>
            <span>{value}</span>
        </li>
    ) : null
}

// ** Movie Credit Component **
const MovieCredit = ({ movie }: { movie: any }) => (
    <div className="flex flex-col gap-1">
        <NextLink href={`/movies/${movie.id}`}>
            <BaseImage aspect="poster" image={movie.poster_path} name={movie.title} />
        </NextLink>

        <div className="flex flex-col">
            <NextLink className="text-base line-clamp-2" href={`/movies/${movie.id}`}>
                {movie.title}
            </NextLink>

            <small className="text-sm text-default-500">{movie.character}</small>
        </div>
    </div>
)

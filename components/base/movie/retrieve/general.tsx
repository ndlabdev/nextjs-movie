// ** HeroUI Imports
import { Divider } from '@heroui/react'

// ** Icons Imports
import { Star } from 'lucide-react'

// ** Utils Imports
import { formattedDate, formatDuration } from '@/utils/helpers'

// ** Components Imports
import BaseMovieRetrieveChip from '@/components/base/movie/retrieve/chip'

// ** Types Imports
import { IMovies } from '@/types/movies'

// ** Interface
interface Props {
    data: IMovies
}

export default function BaseMovieRetrieveGeneral({ data }: Props) {
    const { name, title, first_air_date, release_date, runtime, genres, tagline, overview, vote_average, credits } = data

    const filterCrewByDepartment = (department: string) =>
        credits.crew.filter(person => person.department === department).slice(0, 3)

    const directors = filterCrewByDepartment('Directing')
    const writers = filterCrewByDepartment('Writing')

    return (
        <section>
            <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-auto">
                    <h1 className="mb-3 text-4xl md:mb-2 md:text-5xl">{title || name}</h1>
                    <div className="text-base font-normal flex items-center gap-4 overflow-hidden">
                        <span>{formattedDate(release_date || first_air_date)}</span>
                        {runtime && (
                            <>
                                <span>•</span>
                                <span>{formatDuration(runtime || 0)}</span>
                            </>
                        )}
                    </div>
                </div>

                <div className='flex items-center justify-between gap-2 max-md:mt-2 max-md:flex-wrap'>
                    <div className='flex min-w-[243px] flex-shrink-0 items-center text-base'>
                        <div className="flex flex-shrink-0 items-center gap-1 whitespace-nowrap text-sm">
                            <Star className='text-primary fill-primary' size={16} />
                            <span>{vote_average} / 10</span>
                        </div>
                    </div>
                </div>
            </div>

            {genres.length > 0 && <BaseMovieRetrieveChip data={genres} />}

            {tagline && <blockquote className="mt-4">“{tagline}”</blockquote>}

            {overview && <p className="relative mt-4 overflow-hidden">{overview}</p>}

            <Divider className="my-4" />

            {(directors.length > 0 || writers.length > 0) && (
                <ul className="mt-4 space-y-4">
                    {directors.length > 0 && (
                        <CrewList crew={directors} title="Directors" />
                    )}
                    {writers.length > 0 && (
                        <CrewList crew={writers} title="Writers" />
                    )}
                </ul>
            )}
        </section>
    )
}

// ** Extracted Crew List Component for Reusability
const CrewList = ({ title, crew }: { title: string; crew: any[] }) => (
    <li className="flex gap-2">
        <strong className="min-w-20">{title}</strong>
        <BaseMovieRetrieveChip data={crew} />
    </li>
)

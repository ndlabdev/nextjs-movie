'use client'

// ** Next Imports
import Link from 'next/link'

// ** React Imports
import { useState, useMemo } from 'react'

// ** HeroUI Imports
import { Button } from '@heroui/react'

// ** Components Imports
import BaseTitle from '@/components/base/title'
import BaseImage from '@/components/base/image'
import MovieInfo from '@/components/base/movie/info'

// ** Context Imports
import { useMovieRetrieveContext } from '@/context/movie/retrieve'

// ** Types Imports
import { Cast } from '@/types/movies'

// ** Interface
interface Props {
    type?: 'movie' | 'tv'
}

export default function BaseMovieRetrieveCredits({ }: Props) {
    // ** Hooks
    const [showCast, setShowCast] = useState<boolean>(true)
    const [showCrew, setShowCrew] = useState<boolean>(true)
    const data = useMovieRetrieveContext()

    // ** Memoized Crew Grouping
    const groupedByJob = useMemo(() => {
        return (data?.credits?.crew ?? []).reduce((acc, item) => {
            const job = item.job || 'Unknown'

            ;(acc[job] ||= []).push(item)

            return acc
        }, {} as Record<string, typeof data.credits.crew[number][]>)
    }, [data?.credits?.crew])
    
    return (
        <div className="container mx-auto mt-6 px-3 md:mt-10 md:px-6">
            {/* Movie Info */}
            <MovieInfo data={data} />

            <div className='mt-12'>
                {/* Cast Section */}
                <CreditsList
                    count={data?.credits?.cast?.length}
                    show={showCast}
                    title="Cast"
                    toggleShow={() => setShowCast(prev => !prev)}
                >
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-6">
                        {data?.credits?.cast?.map(item => (
                            <PersonCard key={item.id} person={item} subtitle={item.character} />
                        ))}
                    </div>
                </CreditsList>

                {/* Crew Section */}
                <CreditsList
                    count={data?.credits?.crew?.length}
                    show={showCrew}
                    title="Crew"
                    toggleShow={() => setShowCrew(prev => !prev)}
                >
                    <CrewList groupedByJob={groupedByJob} />
                </CreditsList>
            </div>
        </div>
    )
}

/* ---------------------------------------- */
/*            REUSABLE COMPONENTS           */
/* ---------------------------------------- */

// ** Generic Cast/Crew List Wrapper
const CreditsList = ({ title, count, show, toggleShow, children }: { 
    title: string, 
    count: number, 
    show: boolean, 
    toggleShow: () => void, 
    children: React.ReactNode 
}) => (
    <section className='mb-10'>
        <BaseTitle title={`${title} (${count})`}>
            <Button onPress={toggleShow}>{show ? 'Hide' : 'Show'}</Button>
        </BaseTitle>

        {show && <div className="mt-4">{children}</div>}
    </section>
)

// ** Render Grouped Crew List
const CrewList = ({ groupedByJob }: { groupedByJob: Record<string, Cast[]> }) => (
    <div className="space-y-6">
        {Object.entries(groupedByJob).map(([job, people]) => (
            <div key={job}>
                <h2 className="text-lg font-bold mb-2">{job}</h2>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-6">
                    {people.map(person => <PersonCard key={`${person.id}-${person.job}`} person={person} />)}
                </div>
            </div>
        ))}
    </div>
)

// ** Render Single Person Card
const PersonCard = ({ person, subtitle }: { person: Cast, subtitle?: string }) => (
    <div className='flex flex-col gap-1'>
        <Link href='/'>
            <BaseImage aspect="square" image={person.profile_path} name={person.name} />
        </Link>

        <div className="flex flex-col">
            <Link className="text-base" href='/'>{person.name}</Link>
            {subtitle && <small className="text-sm text-default-500">{subtitle}</small>}
        </div>
    </div>
)

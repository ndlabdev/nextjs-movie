'use client'

// ** React Imports
import { createContext, useContext } from 'react'

// ** HeroUI Imports
import { Spinner } from '@heroui/react'

// ** Hooks Imports
import { useDiscoverDetail } from '@/hooks/useGenres'

// ** Types Imports
import { Genre } from '@/types/movies'

// ** Interface
interface Props {
    children: React.ReactNode
}

export const GenreRetrieveContext = createContext<Genre | null>(null)

export function GenreRetrieveProvider({ children }: Props) {
    const { data, isFetching } = useDiscoverDetail()

    if (isFetching) {
        return (
            <div className="flex justify-center py-4">
                <Spinner />
            </div>
        )
    }

    if (!data) return null

    return <GenreRetrieveContext.Provider value={data}>{children}</GenreRetrieveContext.Provider>
}

export function useGenreRetrieveContext() {
    const context = useContext(GenreRetrieveContext)

    if (!context) {
        throw new Error('useGenreRetrieveContext must be used within a GenreRetrieveProvider')
    }

    return context
}

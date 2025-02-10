'use client'

// ** React Imports
import { createContext, useContext } from 'react'

// ** HeroUI Imports
import { Spinner } from '@heroui/react'

// ** Hooks Imports
import { useDiscoverDetail } from '@/hooks/useMovies'

// ** Types Imports
import { IMovies } from '@/types/movies'

// ** Interface
interface Props {
    children: React.ReactNode
}

export const MovieRetrieveContext = createContext<IMovies | null>(null)

export function MovieRetrieveProvider({ children }: Props) {
    const { data, isFetching } = useDiscoverDetail()

    if (isFetching) {
        return (
            <div className="flex justify-center py-4">
                <Spinner />
            </div>
        )
    }

    if (!data) return null

    return <MovieRetrieveContext.Provider value={data}>{children}</MovieRetrieveContext.Provider>
}

export function useMovieRetrieveContext() {
    const context = useContext(MovieRetrieveContext)

    if (!context) {
        throw new Error('useMovieRetrieveContext must be used within a MovieRetrieveProvider')
    }

    return context
}

'use client'

// ** React Imports
import { createContext, useContext } from 'react'

// ** HeroUI Imports
import { Spinner } from '@heroui/react'

// ** Hooks Imports
import { usePeopleDetail } from '@/hooks/usePeople'

// ** Types Imports
import { IPeople } from '@/types/people'

// ** Interface
interface Props {
    children: React.ReactNode
}

export const PeopleRetrieveContext = createContext<IPeople | null>(null)

export function PeopleRetrieveProvider({ children }: Props) {
    const { data, isFetching } = usePeopleDetail()

    if (isFetching) {
        return (
            <div className="flex justify-center py-4">
                <Spinner />
            </div>
        )
    }

    if (!data) return null

    return <PeopleRetrieveContext.Provider value={data}>{children}</PeopleRetrieveContext.Provider>
}

export function usePeopleRetrieveContext() {
    const context = useContext(PeopleRetrieveContext)

    if (!context) {
        throw new Error('usePeopleRetrieveContext must be used within a PeopleRetrieveProvider')
    }

    return context
}

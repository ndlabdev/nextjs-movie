'use client'

// ** HeroUI Imports
import { Chip } from '@heroui/react'

// ** Types Imports
import { Genre } from '@/types/movies'

// ** Interface
interface Props {
    data: Genre[]
}

export default function BaseMovieRetrieveChip({ data }: Props) {
    if (!data?.length) return null

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {data.map(({ id, name }) => (
                <Chip key={id} size="sm">{name}</Chip>
            ))}
        </div>
    )
}

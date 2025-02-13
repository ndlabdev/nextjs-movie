'use client'

// ** Next Imports
import Link from 'next/link'

// ** HeroUI Imports
import { Chip } from '@heroui/react'

// ** Types Imports
import { Genre } from '@/types/movies'

// ** Interface
interface Props {
    isMovie?: boolean
    isGenre?: boolean
    data: Genre[]
}

export default function BaseMovieRetrieveChip({ data, isGenre, isMovie }: Props) {
    if (!data?.length) return null
    
    const getLinkUrl = (id: number) => {
        if (isGenre) {
            const type = isMovie ? 'movie' : 'tv'

            return `/genre/${id}/${type}`
        } else {
            return `/people/${id}`
        }
    }

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {data.map(({ id, name }) => (
                <Link key={id} href={getLinkUrl(id)}>
                    <Chip size="sm">{name}</Chip>
                </Link>
            ))}
        </div>
    )
}

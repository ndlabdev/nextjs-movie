'use client'

// ** Next Imports
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'

// ** HeroUI Imports
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, SharedSelection } from '@heroui/react'

// ** React Imports
import { useMemo } from 'react'

// ** Icons Imports
import { AlignLeft } from 'lucide-react'

// ** Components Imports
import BaseTitle from '@/components/base/title'
import { getGenreName } from '@/utils/helpers'

// ** Interface
interface Props {
    type: 'movie' | 'tv'
}

const sortMovieOptions = [
    { key: 'popularity.desc', label: 'Most Popular' },
    { key: 'popularity.asc', label: 'Least Popular' },
    { key: 'vote_average.desc', label: 'Highest Rated' },
    { key: 'vote_average.asc', label: 'Lowest Rated' },
    { key: 'release_date.desc', label: 'Newest First' },
    { key: 'release_date.asc', label: 'Oldest First' },
    { key: 'title.asc', label: 'A-Z' },
    { key: 'title.desc', label: 'Z-A' }
]

const sortTVOptions = [
    { key: 'popularity.desc', label: 'Most Popular' },
    { key: 'popularity.asc', label: 'Least Popular' },
    { key: 'vote_average.desc', label: 'Highest Rated' },
    { key: 'vote_average.asc', label: 'Lowest Rated' },
    { key: 'first_air_date.desc', label: 'Newest First' },
    { key: 'first_air_date.asc', label: 'Oldest First' },
    { key: 'name.asc', label: 'A-Z' },
    { key: 'name.desc', label: 'Z-A' }
]

export default function DiscoverSort({ type }: Props) {
    const router = useRouter()
    const params = useParams()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const sortOptions = type === 'movie' ? sortMovieOptions : sortTVOptions

    // Get current sort value from URL
    const currentSort = searchParams.get('sort') || 'popularity.desc'

    // Get the selected label
    const selectedValue = useMemo(() => {
        return sortOptions.find((item) => item.key === currentSort)?.label || 'Sort'
    }, [currentSort])

    // Handle sort change
    const handleSelectionChange = (keys: SharedSelection) => {
        const newSort = Array.from(keys)[0] as string

        if (newSort && newSort !== currentSort) {
            const params = new URLSearchParams(searchParams)

            params.set('sort', newSort)
            router.push(`${pathname}?${params.toString()}`, { scroll: false })
        }
    }

    return (
        <>
            {(params.id && params.slug) ? (
                <BaseTitle title={getGenreName(Number(params.id), params.slug as string)}>
                    <div className='flex flex-shrink-0 items-center gap-1'>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className='text-white'
                                    startContent={<AlignLeft size={20} />}
                                    variant='light'
                                >
                                    {selectedValue}
                                </Button>
                            </DropdownTrigger>
    
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Movie Sort"
                                selectedKeys={new Set([currentSort])}
                                selectionMode="single"
                                variant="flat"
                                onSelectionChange={handleSelectionChange}
                            >
                                {sortOptions.map((item) => (
                                    <DropdownItem key={item.key}>{item.label}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </BaseTitle>
            ) : (
                <div className='flex flex-shrink-0 items-center gap-1'>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className='text-white'
                                startContent={<AlignLeft size={20} />}
                                variant='light'
                            >
                                {selectedValue}
                            </Button>
                        </DropdownTrigger>
    
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Movie Sort"
                            selectedKeys={new Set([currentSort])}
                            selectionMode="single"
                            variant="flat"
                            onSelectionChange={handleSelectionChange}
                        >
                            {sortOptions.map((item) => (
                                <DropdownItem key={item.key}>{item.label}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            )}
        </>
    )
}

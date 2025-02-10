'use client'

// ** Next Imports
import { useRouter, useSearchParams } from 'next/navigation'

// ** HeroUI Imports
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react'

// ** React Imports
import { useMemo } from 'react'

// ** Icons Imports
import { AlignLeft } from 'lucide-react'

const sortOptions = [
    { key: 'popularity.desc', label: 'Most Popular' },
    { key: 'popularity.asc', label: 'Least Popular' },
    { key: 'vote_average.desc', label: 'Highest Rated' },
    { key: 'vote_average.asc', label: 'Lowest Rated' },
    { key: 'first_air_date.desc', label: 'Newest First' },
    { key: 'first_air_date.asc', label: 'Oldest First' },
    { key: 'name.asc', label: 'A-Z' },
    { key: 'name.desc', label: 'Z-A' }
]

export default function TVSeriesFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Get current sort value from URL
    const currentSort = searchParams.get('sort') || 'popularity.desc'

    // Get the selected label
    const selectedValue = useMemo(() => {
        return sortOptions.find((item) => item.key === currentSort)?.label || 'Sort'
    }, [currentSort])

    // Handle sort change
    const handleSelectionChange = (keys) => {
        const newSort = keys.values().next().value

        if (newSort !== currentSort) {
            const params = new URLSearchParams(searchParams)

            params.set('sort', newSort)
            router.push(`/tv-series?${params.toString()}`, { scroll: false })
        }
    }

    return (
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
    )
}

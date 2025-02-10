'use client'

// ** HeroUI Imports
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react'

// ** React Imports
import { useMemo, useState } from 'react'

// ** Icons Imports
import { AlignLeft } from 'lucide-react'

export const animals = [
    {key: 'cat', label: 'Most popular first'},
    {key: 'dog', label: 'Highest rated first'},
    {key: 'elephant', label: 'Elephant'},
    {key: 'lion', label: 'Lion'},
    {key: 'tiger', label: 'Tiger'},
    {key: 'giraffe', label: 'Giraffe'},
    {key: 'dolphin', label: 'Dolphin'},
    {key: 'penguin', label: 'Penguin'},
    {key: 'zebra', label: 'Zebra'},
    {key: 'shark', label: 'Shark'},
    {key: 'whale', label: 'Whale'},
    {key: 'otter', label: 'Otter'},
    {key: 'crocodile', label: 'Crocodile'}
]

export default function TVSeriesFilter() {
    const [selectedKeys, setSelectedKeys] = useState(new Set(['text']))

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(', ').replace(/_/g, ''),
        [selectedKeys]
    )

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
                    aria-label="Single selection example"
                    selectedKeys={selectedKeys}
                    selectionMode="single"
                    variant="flat"
                >
                    <DropdownItem key="text">Text</DropdownItem>
                    <DropdownItem key="number">Number</DropdownItem>
                    <DropdownItem key="date">Date</DropdownItem>
                    <DropdownItem key="single_date">Single Date</DropdownItem>
                    <DropdownItem key="iteration">Iteration</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

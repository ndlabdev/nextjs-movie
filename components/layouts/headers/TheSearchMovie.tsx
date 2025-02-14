'use client'

// ** Next Imports
import Link from 'next/link'

// ** React Imports
import { useEffect, useState } from 'react'

// ** HeroUI Imports
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    Input
} from '@heroui/react'

// ** Icons Imports
import { Search } from 'lucide-react'

// ** Hooks Imports
import { useMovieSearch } from '@/hooks/useMovies'

// ** Utils Imports
import { getMediaType, getYear } from '@/utils/helpers'

// ** Components Imports
import BaseImage from '@/components/base/image'

export default function TheSearchMovie() {
    const { data, search, setSearch } = useMovieSearch()
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    // const [isOpen, setIsOpen] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string | undefined>(search)

    // Debounce API calls to avoid too many requests
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(inputValue)
        }, 300)

        return () => clearTimeout(timeout)
    }, [inputValue])

    const navigationTo = (value: string, id: number) => {
        const media_type: Record<string, string> = {
            'movie': '/movies',
            'tv': '/tv-series',
            'person': '/people'
        }

        return `${media_type[value]}/${id}`
    }

    return (
        <>
            <Button size='sm' startContent={<Search size={16} />} variant='shadow' onPress={onOpen}>
                Search
            </Button>

            <Modal hideCloseButton isOpen={isOpen} scrollBehavior='inside' size='4xl' onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <Input
                                    // eslint-disable-next-line jsx-a11y/no-autofocus
                                    autoFocus
                                    placeholder='Search for movies, tv shows and people...'
                                    radius='none'
                                    value={inputValue}
                                    variant='flat'
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            </ModalHeader>

                            <ModalBody>
                                <div className='flex-auto overflow-y-auto overscroll-contain outline-none w-full'>
                                    {data?.results.map(item => (
                                        <Link
                                            key={item.id}
                                            className='w-full select-none outline-none cursor-pointer text-sm truncate flex items-center gap-3 text-main px-5 py-2 hover:bg-stone-700'
                                            href={navigationTo(item.media_type, item.id)}
                                            onClick={onClose}
                                        >
                                            <div className='rounded overflow-hidden flex-shrink-0 text-muted'>
                                                <div className='w-11 aspect-poster group relative flex-shrink-0'>
                                                    <BaseImage
                                                        aspect='poster'
                                                        image={item.poster_path || item.profile_path}
                                                        name={item.title || item.name}
                                                    />
                                                    <div className='pointer-events-none absolute inset-0 block bg-black opacity-0 transition-opacity group-hover:opacity-10' />
                                                </div>
                                            </div>

                                            <div className='min-w-auto mr-auto w-full overflow-hidden overflow-ellipsis'>
                                                {item.title || item.name}

                                                <div className="mt-1 whitespace-normal text-xs text-default-500">
                                                    <div>
                                                        {item.media_type === 'person' ? (
                                                            <div>{item.known_for_department}</div>
                                                        ) : (
                                                            <>
                                                                {item.release_date || item.first_air_date && (<div className="mb-1">{getYear(item.release_date || item.first_air_date)}</div>)}
                                                                <div>{getMediaType(item.media_type)}</div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

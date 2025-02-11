'use client'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** React Imports
import { useState } from 'react'

// ** HeroUI Imports
import { Button } from '@heroui/react'
import { Modal, ModalContent, ModalBody, ModalHeader, useDisclosure, ModalFooter } from '@heroui/react'

// ** Components Imports
import BaseTitle from '@/components/base/title'
import BaseImage from '@/components/base/image'
import MovieInfo from '@/components/base/movie/info'

// ** Context Imports
import { useMovieRetrieveContext } from '@/context/movie/retrieve'

// ** Utils Imports
import { showImageOriginal } from '@/utils/helpers'

// ** Types Imports
import { FileImage, IMovies } from '@/types/movies'

// ** Interface
interface Props {
    type?: 'movie' | 'tv'
}

export default function BaseMovieRetrieveBackdrops({ }: Props) {
    // ** Hooks
    const [showBackdrops, setShowBackdrops] = useState(true)
    const data = useMovieRetrieveContext()

    return (
        <div className="container mx-auto mt-6 px-3 md:mt-10 md:px-6">
            {/* Movie Info */}
            <MovieInfo data={data} />

            <div className='mt-12'>
                {/* Cast Section */}
                <CreditsList
                    count={data?.images?.backdrops?.length}
                    show={showBackdrops}
                    title="Backdrops"
                    toggleShow={() => setShowBackdrops(prev => !prev)}
                >
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-6">
                        {data?.images?.backdrops?.map((item, index) => (
                            <PersonCard key={index} data={data} item={item} />
                        ))}
                    </div>
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

// ** Render Single Person Card
const PersonCard = ({ item, data }: { item: FileImage, data: IMovies }) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [currentImage, setCurrentImage] = useState<FileImage>()

    const handleOpen = (item: FileImage) => {
        onOpen()
        setCurrentImage(item)
    }

    return (
        <>
            <div className='flex flex-col gap-1'>
                <Link href='javascript:void(0)' onClick={() => handleOpen(item)}>
                    <BaseImage aspect="square" image={item.file_path} name={data.title || data.name} />
                </Link>
    
                <div className="flex flex-col">
                    <span className='text-xs'>Size</span>
                    <span className='text-sm'>{item.width}x{item.height}</span>
                </div>
            </div>

            <Modal isOpen={isOpen} size='5xl' onClose={onClose}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader />
                            <ModalBody>
                                {currentImage && (
                                    <Image
                                        alt={data.title || data.name}
                                        className="max-h-full w-auto object-contain shadow"
                                        decoding="async"
                                        draggable={false}
                                        height={1280}
                                        loading="lazy"
                                        src={showImageOriginal(currentImage.file_path)}
                                        title={data.title || data.name}
                                        width={720}
                                    />
                                )}
                            </ModalBody>
                            <ModalFooter />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

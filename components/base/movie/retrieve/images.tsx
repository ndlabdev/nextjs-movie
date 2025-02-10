'use client'

// ** Next Imports
import Image from 'next/image'

// ** React Imports
import { useState } from 'react'

// ** HeroUI Imports
import { Modal, ModalContent, ModalBody, ModalHeader, useDisclosure } from '@heroui/react'

// ** Utils Imports
import { showImage, showImageOriginal } from '@/utils/helpers'

// ** Components Imports
import BaseTitle from '@/components/base/title'

// ** Types Imports
import { IMovies } from '@/types/movies'

// ** Interface
interface Props {
    data: IMovies
}

export default function BaseMovieRetrieveImages({ data }: Props) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [currentImage, setCurrentImage] = useState()

    if (!data.images.backdrops.length) return null

    const images = data.images.backdrops.slice(0, 5)

    const handleOpen = (item: any) => {
        onOpen()
        setCurrentImage(item)
    }

    return (
        <section>
            <div className='mb-5'>
                <BaseTitle title='Images' />
            </div>
                        
            <div className='grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-6'>
                {images.map(item => (
                    <Image
                        key={item.file_path}
                        alt={data.title}
                        className="aspect-square w-full cursor-pointer rounded object-cover"
                        decoding="async"
                        draggable={false}
                        height={300}
                        loading="lazy"
                        src={showImage(item.file_path)}
                        title={data.title}
                        width={300}
                        onClick={() => handleOpen(item)}
                    />
                ))}
            </div>

            <Modal isOpen={isOpen} size='5xl' onClose={onClose}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader />
                            <ModalBody>
                                <Image
                                    alt={data.title}
                                    className="max-h-full w-auto object-contain shadow"
                                    decoding="async"
                                    draggable={false}
                                    height={1280}
                                    loading="lazy"
                                    src={showImageOriginal(currentImage.file_path)}
                                    title={data.title}
                                    width={720}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </section>
    )
}

'use client'

// ** Next Imports
import Image from 'next/image'

// ** React Imports
import { useState } from 'react'

// ** HeroUI Imports
import { Button, Link } from '@heroui/react'
import { Modal, ModalContent, ModalBody, ModalHeader, useDisclosure, ModalFooter } from '@heroui/react'

// ** Icons Imports
import { ChevronRight } from 'lucide-react'

// ** Utils Imports
import { showImage, showImageOriginal } from '@/utils/helpers'

// ** Components Imports
import BaseTitle from '@/components/base/title'

// ** Types Imports
import { FileImage, IMovies } from '@/types/movies'

// ** Interface
interface Props {
    data: IMovies
    link?: string
}

export default function BaseMovieRetrieveImages({ data, link = '/' }: Props) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [currentImage, setCurrentImage] = useState<FileImage>()

    if (!data.images.backdrops.length) return null

    const images = data.images.backdrops.slice(0, 5)

    const handleOpen = (item: FileImage) => {
        onOpen()
        setCurrentImage(item)
    }

    return (
        <section>
            <div className='mb-5'>
                <BaseTitle title='Backdrops'>
                    <Button
                        as={Link}
                        endContent={<ChevronRight size={18} />}
                        href={`/${link}/${data.id}/backdrops`}
                        variant="flat"
                    >
                        View More
                    </Button>
                </BaseTitle>
            </div>
                        
            <div className='grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-6'>
                {images.map(item => (
                    <Image
                        key={item.file_path}
                        alt={data.title || data.name}
                        className="aspect-square w-full cursor-pointer rounded object-cover"
                        decoding="async"
                        draggable={false}
                        height={300}
                        loading="lazy"
                        src={showImage(item.file_path)}
                        title={data.title || data.name}
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
        </section>
    )
}

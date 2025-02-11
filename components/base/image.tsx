// ** Next Imports
import Image from 'next/image'

// ** Icons Imports
import { Film } from 'lucide-react'

// ** Utils Imports
import { showImage } from '@/utils/helpers'

// ** Interface
interface Props {
    name: string
    image?: string
    aspect?: 'video' | 'poster'
}

export default function BaseImage({ name, image, aspect = 'video' }: Props) {
    return (
        <>
            {image ? (
                <Image
                    alt={name as string}
                    className={`mb-1 rounded w-full object-cover block ${aspect === 'video' ? 'aspect-video' : 'aspect-poster'}`}
                    decoding="async"
                    draggable={false}
                    height={500}
                    loading="lazy"
                    src={showImage(image)}
                    title={name}
                    width={500}
                />
            ) : (
                <div className={`h-full w-full rounded bg-black/40 object-cover flex items-center justify-center overflow-hidden ${aspect === 'video' ? 'aspect-video' : 'aspect-poster'}`}>
                    <Film size={36} />
                </div>
            )}
        </>
    )
}

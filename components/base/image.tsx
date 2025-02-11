// ** Next Imports
import Image from 'next/image'

// ** Icons Imports
import { Film } from 'lucide-react'

// ** Utils Imports
import { showImage } from '@/utils/helpers'

// ** Interface
interface Props {
    name: string
    image?: string | null
    aspect?: 'video' | 'poster' | 'square'
    responsive?: boolean
}

export default function BaseImage({ name, image, responsive = false, aspect = 'video' }: Props) {
    const aspectClasses = {
        video: 'aspect-video',
        poster: 'aspect-poster',
        square: 'aspect-square'
    } as const

    const className = aspectClasses[aspect] ?? 'aspect-video'

    return image ? (
        <Image
            priority
            alt={name}
            className={`mb-1 rounded object-cover block ${responsive ? 'w-72 md:w-full' : 'w-full'} ${className}`}
            decoding="async"
            draggable={false}
            height={500}
            src={showImage(image)}
            title={name}
            width={500}
        />
    ) : (
        <div className={`h-full w-full rounded bg-black/40 object-cover flex items-center justify-center overflow-hidden ${className}`}>
            <Film size={36} />
        </div>
    )
}

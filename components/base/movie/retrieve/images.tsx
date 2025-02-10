// ** Next Imports
import Image from 'next/image'

// ** Utils Imports
import { showImage } from '@/utils/helpers'

// ** Components Imports
import BaseTitle from '@/components/base/title'

// ** Types Imports
import { IMovies } from '@/types/movies'

// ** Interface
interface Props {
    data: IMovies
}

export default function BaseMovieRetrieveImages({ data }: Props) {
    if (!data.images.backdrops.length) return null

    const images = data.images.backdrops.slice(0, 5)

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
                    />
                ))}
            </div>
        </section>
    )
}

// ** React Imports
import { Suspense } from 'react'

// ** Components Imports
import BaseMovieShowInfinite from '@/components/base/movie/show-infinite'
import BaseTitle from '@/components/base/title'
import DiscoverSort from '@/components/pages/discover/sort'

export default function Movie() {
    return (
        <div className="pb-6">
            <div className="container mx-auto p-3 @container md:p-6">
                <section className="mb-5 md:mb-10">
                    <BaseTitle title='Movies'>
                        <Suspense>
                            <DiscoverSort type='movie' />
                        </Suspense>
                    </BaseTitle>
                </section>

                <BaseMovieShowInfinite type='movie' />
            </div>
        </div>
    )
}

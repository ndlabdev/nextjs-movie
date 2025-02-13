// ** Components Imports
import BaseMovieShowInfinite from '@/components/base/movie/show-infinite'
import DiscoverSort from '@/components/pages/discover/sort'

export default function Movie() {
    return (
        <div className="pb-6">
            <div className="container mx-auto p-3 @container md:p-6">
                <section className="mb-5 md:mb-10">
                    <DiscoverSort type='movie' />
                </section>

                <BaseMovieShowInfinite type='movie' />
            </div>
        </div>
    )
}

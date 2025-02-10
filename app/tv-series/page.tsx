// ** Components Imports
import TVSeriesSort from '@/components/pages/tv-series/sort'
import BaseMovieShowInfinite from '@/components/base/movie/show-infinite'
import BaseTitle from '@/components/base/title'

export default function TVSeries() {
    return (
        <div className="pb-6">
            <div className="container mx-auto p-3 @container md:p-6">
                <section className="mb-5 md:mb-10">
                    <BaseTitle title='TV Series'>
                        <TVSeriesSort />
                    </BaseTitle>
                </section>

                <BaseMovieShowInfinite type='tv' />
            </div>
        </div>
    )
}

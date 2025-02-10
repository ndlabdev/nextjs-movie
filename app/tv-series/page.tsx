// ** Components Imports
import TVSeriesSort from '@/components/pages/tv-series/sort'
import BaseMovieShowInfinite from '@/components/base/movie/show-infinite'

export default function TVSeries() {
    return (
        <div className="pb-6">
            <div className="container mx-auto p-3 @container md:p-6">
                <section className="mb-5 md:mb-10">
                    <div className="flex-auto m-0">
                        <div className="flex items-center gap-x-11 gap-y-4 max-md:overflow-x-auto">
                            <div className="flex-auto">
                                <div className="relative flex items-center gap-1 pl-4 before:absolute before:left-0 before:h-5/6 before:w-1 before:rounded before:bg-primary">
                                    <h1 className="text-2xl md:text-3xl font-semibold">TV Series</h1>
                                </div>
                            </div>

                            <TVSeriesSort />
                        </div>
                    </div>
                </section>

                <BaseMovieShowInfinite />
            </div>
        </div>
    )
}

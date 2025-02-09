// ** Components Imports
import HomeCarousel from '@/components/pages/home/carousel'
import HomeMovieGenres from '@/components/pages/home/movie-genres'

export default function Home() {
    return (
        <div className="pb-6">
            <div className="container mx-auto p-3 @container md:p-6">
                <HomeCarousel />
                <HomeMovieGenres />
            </div>
        </div>
    )
}

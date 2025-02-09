// ** Types Imports
import { IGeneral } from './index'

export interface ITrendingMovies extends IGeneral {
    results: {
        id: number
        title: string
        overview: string
        poster_path: string
        backdrop_path: string
        vote_average: number
    }[]
}

// ** Types Imports
import { IGeneral } from './index'

export interface ITVSeries {
    id: number
    name: string
    overview: string
    poster_path: string
    vote_average: number
}

export interface ITVSeriesPopular extends IGeneral {
    results: ITVSeries[]
}

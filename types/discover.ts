// ** Types Imports
import { IGeneral } from './index'

export interface IDiscover {
    id: number
    name?: string
    title?: string
    overview: string
    poster_path: string
    vote_average: number
}

export interface IDiscoverMovie extends IGeneral {
    results: IDiscover[]
}

// ** Types Imports
import { IMoviesResult } from './trending-movies'

export interface IMovies {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: BelongsToCollection;
    budget:                number;
    genres:                Genre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    origin_country:        string[];
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           string;
    production_companies:  ProductionCompany[];
    production_countries:  ProductionCountry[];
    release_date:          string;
    first_air_date:        string;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    name:                  string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
    credits:               Credits;
    keywords:              Keywords;
    images:                Images;
    reviews:               Reviews;
    recommendations:       Recommendations;
}

export interface Recommendations {
    page:          number;
    results:       IMoviesResult[];
    total_pages:   number;
    total_results: number;
}

export interface BelongsToCollection {
    id:            number;
    name:          string;
    poster_path:   string;
    backdrop_path: string;
}

export interface Credits {
    cast: Cast[];
    crew: Cast[];
}

export interface Cast {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for_department: string;
    name:                 string;
    original_name:        string;
    popularity:           number;
    profile_path:         null | string;
    cast_id?:             number;
    character?:           string;
    credit_id:            string;
    order?:               number;
    department?:          string;
    job?:                 string;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface Images {
    backdrops: any[];
    logos:     any[];
    posters:   any[];
}

export interface Keywords {
    keywords: Genre[];
}

export interface ProductionCompany {
    id:             number;
    logo_path:      string;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface Reviews {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Result {
    author:         string;
    author_details: AuthorDetails;
    content:        string;
    created_at:     Date;
    id:             string;
    updated_at:     Date;
    url:            string;
}

export interface AuthorDetails {
    name:        string;
    username:    string;
    avatar_path: string;
    rating:      number;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}

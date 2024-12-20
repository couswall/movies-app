export interface IMediaSearchResponse {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Result {
    backdrop_path:     string;
    id:                number;
    name?:             string;
    original_name?:    string;
    overview:          string;
    poster_path:       string;
    media_type:        MediaType;
    adult:             boolean;
    original_language: OriginalLanguage;
    genre_ids:         number[];
    popularity:        number;
    first_air_date?:   string;
    vote_average:      number;
    vote_count:        number;
    origin_country?:   string[];
    title?:            string;
    original_title?:   string;
    release_date?:     string;
    video?:            boolean;
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
}

export enum OriginalLanguage {
    Ja = "ja",
}

export interface IMediaSearchState {
    data: IMediaSearchResponse;
    isLoading: boolean;
    error: boolean;
}

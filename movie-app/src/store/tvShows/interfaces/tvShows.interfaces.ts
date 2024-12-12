export interface TvShowsResponse {
    page:          number;
    results:       ITvShows[];
    total_pages:   number;
    total_results: number;
}

export interface ITvShows {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    origin_country:    string[];
    original_language: string;
    original_name:     string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    first_air_date:    string;
    name:              string;
    vote_average:      number;
    vote_count:        number;
}

export interface ITvShowsState {
    tvResponse: TvShowsResponse
    tvShows: ITvShows[];
    isLoading: boolean;
    error: boolean;
}
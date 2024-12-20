export interface MoviesByGenreResponse {
    page:          number;
    results:       ResultMoviesByGenre[];
    total_pages:   number;
    total_results: number;
}

export interface ResultMoviesByGenre {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_language: OriginalLanguage;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export enum OriginalLanguage {
    En = "en",
    Es = "es",
    Ko = "ko",
    Nl = "nl",
}

export interface MoviesByGenresState {
    moviesByGenre: ResultMoviesByGenre[];
    isLoading: boolean;
    error: boolean;
}
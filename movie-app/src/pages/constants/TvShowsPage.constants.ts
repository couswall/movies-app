export const TV_SHOWS_PAGE = {
    TITLE: 'Explore TV Shows',
    SELECT_GENRES: 'Select Genres',
    SORT_BY: 'Sort by',
    GENRES_DEFAULT_VALUE: '',
}

export const sortTvShowsOptions = [
    {name: 'Popular Descending', value: 'popularity.desc'},
    {name: 'Popular Ascending', value: 'popularity.asc'},
    {name: 'Rating Descending', value: 'vote_average.desc'},
    {name: 'Rating Ascending', value: 'vote_average.asc'},
    {name: 'Release Descending', value: 'first_air_date.desc'},
    {name: 'Release Ascending', value: 'first_air_date.asc'},
    {name: 'Title (A-Z)', value: 'title.asc'},
];
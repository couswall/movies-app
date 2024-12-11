export const MOVIES_PAGE = {
    TITLE: 'Explore Movies',
    SELECT_GENRES: 'Select Genres',
    SORT_BY: 'Sort by',
    DEFAULT_SELECT_VALUE: '',
};

export const sortMoviesOptions = [
    {name: 'Popular Descending', value: 'original_title.desc'},
    {name: 'Popular Ascending', value: 'original_title.asc'},
    {name: 'Rating Descending', value: 'vote_average.desc'},
    {name: 'Rating Ascending', value: 'vote_average.asc'},
    {name: 'Release Descending', value: 'primary_release_date.desc'},
    {name: 'Release Ascending', value: 'primary_release_date.asc'},
    {name: 'Title (A-Z)', value: 'title.asc'},
];
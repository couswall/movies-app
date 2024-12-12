import { configureStore } from '@reduxjs/toolkit'
import { moviesByGenreSlice, moviesSlice, tvShowsSlice, uiSlice } from './'

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    movies: moviesSlice.reducer,
    moviesByGenre: moviesByGenreSlice.reducer,
    tvShows: tvShowsSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
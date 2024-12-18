import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { ErrorPage, HomePage, Layout, MovieView, MoviesPage, SearchPage, TVPage, TvSerieView } from "../pages";


const routesConfig = createBrowserRouter([
       
    {
        path: '/', 
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: 'movies',
                element: <MoviesPage/>
            },
            {
                path: 'tv',
                element: <TVPage/>
            },
            {
                path: 'movie/:movieId',
                element: <MovieView/>
            },
            {
                path: 'tv-serie/:tvId',
                element: <TvSerieView/>
            },
            {
                path: 'search',
                element: <SearchPage/>
            },
            {
                path: '/*',
                element: <Navigate to={'/'}/>
            }
        ]
    }
]); 



export const AppRouter = () => {
    
   return <RouterProvider router={ routesConfig }/>
    
}

import { useFetch } from "../../hooks/useFetch"

export const MoviesPage = () => {

  const url: string = `https://api.themoviedb.org/3/genre/movie/list`;
  const { data } = useFetch( url );


  console.log(data)
  return (
    <section className="movies-section mt-5">
      <div className="container">
        <h2>Explore Movies</h2>
      </div>
    </section>
  )
}


import { MovieObject } from '.';
import './styles';

export const MovieCard: React.FC<MovieObject> = ({ title, name, poster_path, vote_average, release_date, first_air_date }) => {


  const onFormatDate = ( movieDate: any ) => {

    const date = new Date( movieDate );
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }; 
    
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className="card-movie" >
      <div className="card-img-container position-relative mb-3">
        <img src={`https://image.tmdb.org/t/p/original/${ poster_path}`} alt={ title || name} loading='lazy'/>  
        <div className="raiting-circle position-absolute">
          <span className='fw-bold'>{ (vote_average).toFixed(1) }</span>
        </div>
      </div>

      <div className="card-movie-info">
        <p className='movie-title text-white d-inline-block text-truncate text-wrap w-100'>{ title || name}</p>
        <p className='text-white-50'>{ onFormatDate( release_date || first_air_date ) }</p>
      </div>
    </div>
  )
}

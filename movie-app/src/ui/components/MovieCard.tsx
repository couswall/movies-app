import { Link } from 'react-router-dom';
import { Result } from '../../interfaces';
import './styles';

interface MediaTypeProps extends Result{
  media_type_props?: string; 
}

export const MovieCard: React.FC<Result & MediaTypeProps > = ({ id,title, name, poster_path, vote_average, release_date, first_air_date, media_type, media_type_props}) => {


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
    <Link to={ `${ ( media_type === 'tv' || media_type_props === 'tv' ) ? 'tv-serie' : 'movie'}/${id}`}>
      <div className="card-movie animate__animated animate__fadeIn">
        <div className="card-img-container position-relative mb-3">
          <img src={`https://image.tmdb.org/t/p/original/${ poster_path}`} alt={ title || name} loading='lazy'/>  
          <div className="raiting-circle position-absolute">
            <span className='fw-bold text-black'>{ (vote_average).toFixed(1) }</span>
          </div>
        </div>

        <div className="card-movie-info">
          <p className='movie-title text-white d-inline-block text-truncate text-wrap w-100'>{ title || name}</p>
          <p className='text-white-50'>{ onFormatDate( release_date || first_air_date ) }</p>
        </div>
      </div>
    </Link>
  )
}

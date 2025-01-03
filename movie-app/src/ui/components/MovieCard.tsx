import { useNavigate } from 'react-router-dom';
import { MediaType} from '../../interfaces';
import './styles';
import NoPhoto from '/assets/no-poster.png'; 

interface MediaTypeProps extends MovieCardProps{
  media_type_props?: string; 
}
interface MovieCardProps {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type: MediaType;
  release_date?: string;
  vote_average: number;
  first_air_date?: string;
}

export const MovieCard: React.FC<MovieCardProps & MediaTypeProps> = ({ 
  id,
  title,
  name,
  poster_path,
  vote_average,
  release_date,
  first_air_date,
  media_type,
  media_type_props,
}) => {

  const navigate = useNavigate();

  const onFormatDate = ( movieDate: any ) => {
    const date = new Date( movieDate );
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }; 
    return date.toLocaleDateString('en-US', options);
  }

  const posterUrl = poster_path ? 'https://image.tmdb.org/t/p/original/' + poster_path : NoPhoto;
  const voteAverage = vote_average ? (vote_average).toFixed(1) : (0).toFixed(1);

  return (
      <div className="card-movie animate__animated animate__fadeIn cursor-pointer" onClick={() => navigate(`/${ ( media_type === 'tv' || media_type_props === 'tv' ) ? 'tv-serie' : 'movie'}/${id}`)}>
        <div className="card-img-container position-relative mb-3">
          <img src={ posterUrl } alt={ title || name} loading='lazy'/>  
          <div className="raiting-circle position-absolute">
            <span className='fw-bold text-black'>{ voteAverage }</span>
          </div>
        </div>

        <div className="card-movie-info">
          <p className='movie-title text-white d-inline-block text-truncate text-wrap w-100'>{ title || name}</p>
          <p className='text-white-50'>{ onFormatDate( release_date || first_air_date ) }</p>
        </div>
      </div>
  )
}

import { Movie } from "../../../interfaces";
import { Carousel } from "../../../ui/components";
import { CarouselSkeleton } from "../skeletons";

interface SimilarProps {
    similarMedia: Movie; 
    isLoadingSimilar: boolean;
}

export const Similar: React.FC<SimilarProps> = ({similarMedia, isLoadingSimilar }) => {
    
    const { results } = !!similarMedia && similarMedia; 

    return (
    <section className="similar-section container mt-4 mb-4">
        <h3 className="mb-3">Similar Movies</h3>

        {
            ( isLoadingSimilar ) 
                ? <CarouselSkeleton/>  
                : <Carousel moviesArray={ results }/>
        }

    </section>
  )
}

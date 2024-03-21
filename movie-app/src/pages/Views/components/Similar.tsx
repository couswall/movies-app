import { Movie } from "../../../interfaces";
import { Carousel } from "../../../ui/components";
import { CarouselSkeleton } from "../skeletons";

interface SimilarProps {
    similarMedia: Movie; 
    isLoadingSimilar: boolean;
    mediaTitle: string; 
}

export const Similar: React.FC<SimilarProps> = ({similarMedia, isLoadingSimilar, mediaTitle }) => {
    
    const { results } = !!similarMedia && similarMedia; 

    return (
    <>
    {
        ( results?.length > 0 ) && 

        <section className="similar-section container mt-4 mb-4">
            <h3 className="mb-3">Similar {mediaTitle}</h3>

            {
                ( isLoadingSimilar ) 
                    ? <CarouselSkeleton/>  
                    : <Carousel moviesArray={ results }/>
            }

        </section>
    }
    
    </>
  )
}

import { Movie } from "../../../interfaces";
import { Carousel } from "../../../ui/components"
import { CarouselSkeleton } from "../skeletons"

interface RecommendedProps {
  recommendedMedia: Movie; 
  isLoadingRecommended: boolean;
}

export const Recommended: React.FC<RecommendedProps> = ({recommendedMedia,isLoadingRecommended}) => {

  const { results } = !!recommendedMedia && recommendedMedia; 

  return (
    <section className="similar-section container mt-4 mb-4">
        <h3 className="mb-3">Recommended Movies</h3>

        {
            ( isLoadingRecommended ) 
                ? <CarouselSkeleton/>  
                : <Carousel moviesArray={ results }/>
        }

    </section>
  )
}

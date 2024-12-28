import { Movie } from "../../../interfaces";
import { Carousel } from "../../../ui/components"
import { VIEW_TEXTS } from "../../constants/Views.constants";
import { CarouselSkeleton } from "../skeletons"

interface RecommendedProps {
  recommendedMedia: Movie; 
  isLoadingRecommended: boolean;
  mediaTitle: string; 
}

export const Recommended: React.FC<RecommendedProps> = ({recommendedMedia,isLoadingRecommended, mediaTitle}) => {

  const { results } = !!recommendedMedia && recommendedMedia; 

  return (
    <>
      {
        ( results?.length > 0 ) && 
          <section className="similar-section container mt-4 mb-4">
              <h3 className="mb-3">{VIEW_TEXTS.RECOMMENDED} {mediaTitle}</h3>

              {
                  ( isLoadingRecommended ) 
                      ? <CarouselSkeleton/>  
                      : <Carousel moviesArray={ results }/>
              }

          </section>
      }
    </>
  )
}

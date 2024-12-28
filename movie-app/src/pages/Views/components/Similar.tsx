import { Movie } from "../../../interfaces";
import { Carousel } from "../../../ui/components";
import { VIEW_TEXTS } from "../../constants/Views.constants";
import { CarouselSkeleton } from "../skeletons";

interface SimilarProps {
    similarMedia: Movie; 
    isLoadingSimilar: boolean;
    mediaTitle: string;
    mediaTypeApi?: string;  
}

export const Similar: React.FC<SimilarProps> = ({similarMedia, isLoadingSimilar, mediaTitle, mediaTypeApi }) => {
    const { results } = !!similarMedia && similarMedia; 
    return (
        <>
        {( results?.length > 0 ) && 
                <section className="similar-section container mt-4 mb-4">
                    <h3 className="mb-3">{VIEW_TEXTS.SIMILAR} {mediaTitle}</h3>

                    {
                        ( isLoadingSimilar ) 
                            ? <CarouselSkeleton/>  
                            : <Carousel moviesArray={ results } media_type_props = { mediaTypeApi }/>
                    }
                </section>}
        </>
    )
}

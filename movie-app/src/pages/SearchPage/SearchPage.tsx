import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Loading, MovieCard, SearchInput } from "../../ui/components";
import { useMediaSearchStore } from "./hooks/useMediaSearchStore";
import { Result } from "../../store/movies/interfaces/mediaSearch.interfaces";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const {data, isLoading, getMediaSearch} = useMediaSearchStore();
    const [nextPage, setNextPage] = useState<number>(1);
    const [multiMedia, setMultiMedia] = useState<Result[]>([]);
    const searchingText: string = searchParams.get('q') || '';
    const isValidSearching: boolean = searchingText.length >= 1;
    
    useEffect(() => {
      setNextPage(1);
      if(searchingText.length < 2) return;
      getMediaSearch(searchingText, nextPage);
    }, [searchingText]);
    
    useEffect(() => {
      if (nextPage > data.total_pages) return;
        getMediaSearch(searchingText, nextPage);
    }, [nextPage]);

    useEffect(() => {
        const validMedia = data.results.filter(media => media.vote_average > 1);
        setMultiMedia(validMedia);
    }, [data]);
    
    useEffect(() => {
        const onScroll = () => {
            const scrolledTo = window.scrollY + window.innerHeight;
            const isReachBottom = document.body.scrollHeight - 180 <= scrolledTo;
            const isLastPage = nextPage !== data.total_pages;
            if(isReachBottom && isLastPage) setNextPage(prevPage => prevPage + 1);
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    return (
        <section className="search-section mt-5">
            <div className="container">
                <h2>
                    {isValidSearching
                        ? `Search results for '${searchingText}'`
                        : 'Start typing to search for a movie or TV show...'
                    }
                </h2>
                <SearchInput searchInput={searchingText}/>

                <div className="row">
                    {data.results.length > 0 && multiMedia.map(media => (
                        <div className="col-xxl-2 col-lg-3 col-md-3 col-sm-6 col-6 mb-5 animate__animated animate__fadeIn animate__slower" key={ media.id }>
                            <MovieCard 
                                id={media.id}
                                title={media.title}
                                name={media.name || media.original_name}
                                poster_path={media.poster_path}
                                vote_average={media.vote_average}
                                release_date={media.release_date}
                                media_type={media.media_type}
                                first_air_date={media.first_air_date}
                            />
                            </div>
                    ))}
                    {isLoading && <Loading/>}
                </div>
            </div>
        </section>
  )
}

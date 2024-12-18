import { useSearchParams } from "react-router-dom"
import { SearchInput } from "../../ui/components";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const searchingText: string = searchParams.get('q') || '';
    const isValidSearching: boolean = searchingText.length >= 1;

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
                    
                </div>
            </div>
        </section>
  )
}

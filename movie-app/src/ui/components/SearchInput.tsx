import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const SearchInput: React.FC<SearchInputProps> = ({searchInput}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchingText, setSearchingText] = useState<string>(searchInput);
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setSearchingText(value);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(searchingText.length <= 1) return;

        if (location.pathname === '/search') {
            navigate(`?q=${searchingText}`);
        }else{
            navigate(`search?q=${searchingText}`);
        }
    };

    return (
    <>
        <form className="mb-4 mt-4 w-60 mx-auto d-flex" onSubmit={onSubmit}>
            <input    
                type="text" 
                className="form-control me-2" 
                placeholder="Search"
                autoComplete= "off"
                onChange={onInputChange}
                value={searchingText}
            />
            <button className="btn btn-outline-secondary text-white" type="submit">
                {'Search'}
            </button>
        </form>
    </>
  )
}

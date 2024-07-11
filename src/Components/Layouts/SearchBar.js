import Button from "./Button";
import {useCallback, useState} from "react";
import {getData} from "../../ApiCalls/apis";
import SearchSuggestion from "../Search/SearchSuggestion";

const debounce = function(fun, timeout = 300) {
    let timer;
    return (...args) => {
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(() => { fun.apply(context, args); }, timeout);
    }
}

export default function SearchBar(props) {
    const [searchSuggestion, setSearchSuggestion] = useState(null);

    const apiCall = async (search) => {
        if (search) {
            const result = await getData(`/courses/search?search=${search}`);
            result?.success && setSearchSuggestion(result.data);
        } else {
            setSearchSuggestion(null);
        }
    }

    const debounceApiCall = useCallback(debounce(apiCall, 500), []);

    const handleSearchSuggestion = async (e) => {
        debounceApiCall(e.target.value);
    }

    return (
        <div>
            <div className={props.className}>
                <input type='text' placeholder={props.placeholder}
                       className='p-2 text-lg w-96 rounded-lg bg-white border-2 border-gray-300 outline-none'
                       onKeyUp={handleSearchSuggestion}/>
                <Button type='submit' onClick={props.onClick}><i
                    className='bx bx-search text-2xl bg-cyan-700 text-white py-2 px-3 rounded-full'></i></Button>
            </div>
            {searchSuggestion && <SearchSuggestion searchSuggestion={searchSuggestion}/>}
        </div>
    )
}
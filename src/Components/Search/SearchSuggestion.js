import SearchSuggestionCard from "./SearchSuggestionCard";
import NotFound from "../Layouts/NotFound";
import {Link} from "react-router-dom";

export default function SearchSuggestion({searchSuggestion}) {
    return (
        <div className="absolute top-28">
            <div className="bg-cyan-700 p-4 rounded flex flex-col gap-2 min-w-[600px]">
                {searchSuggestion?.length > 0 && searchSuggestion.map((item, index) => {
                    return <Link to={'/courses/' + item._id}><SearchSuggestionCard course={item} key={item._id} /></Link>
                })}
                {searchSuggestion?.length === 0 && <div className="text-white">
                    <p>No course found, try another course query...</p>
                </div>}
            </div>
        </div>
    );
};
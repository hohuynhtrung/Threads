import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersSuggestions from "@/layouts/DefaultLayout/components/UsersSuggestions";
import { getSuggestion } from "@/services/search/searchServer";

function Search() {
  const dispatch = useDispatch();
  const { list: suggestions } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getSuggestion());
  }, [dispatch]);
  return (
    <div className="w-full">
      {/* header */}
      {/* Search news */}
      {/* Suggestions */}
      <div className="font-medium text-[#8888] p-4">Follow suggestions</div>
      <div className="w-full">
        {suggestions.map((suggestion) => (
          <UsersSuggestions key={suggestion.id} user={suggestion} />
        ))}
      </div>
    </div>
  );
}

export default Search;

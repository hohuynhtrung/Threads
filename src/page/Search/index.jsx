import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersSuggestions from "@/layouts/DefaultLayout/components/UsersSuggestions";
import { getSuggestion } from "@/services/search/searchServer";
import { Spinner } from "@/components/ui/spinner";

function Search() {
  const dispatch = useDispatch();
  const { suggestions, loading } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(getSuggestion());
  }, [dispatch]);

  return (
    <div className="w-full">
      {loading && !suggestions?.length && (
        <div className="w-full flex items-center justify-center py-6">
          <Spinner />
        </div>
      )}

      <div className="w-full">
        <div className="font-medium text-gray-400 dark:text-zinc-500 p-4 text-sm">
          Follow suggestions
        </div>
        {suggestions?.map((suggestion) => (
          <UsersSuggestions key={suggestion.id} user={suggestion} />
        ))}
      </div>
    </div>
  );
}

export default Search;

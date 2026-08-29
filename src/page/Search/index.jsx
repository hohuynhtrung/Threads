import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UsersSuggestions from "@/layouts/DefaultLayout/components/UsersSuggestions";
import { getSuggestion } from "@/services/search/searchServer";
import { useCurrentUser } from "@/features/auth/hook";

import { Spinner } from "@/components/ui/spinner";
import Icons from "@/assets/icons";
import Footer from "@/layouts/components/Footer";

function Search() {
  const dispatch = useDispatch();
  const { suggestions, loading } = useSelector((state) => state.search);
  const currentUser = useCurrentUser();
  const isLoggedIn = Boolean(currentUser);

  useEffect(() => {
    dispatch(getSuggestion());
  }, [dispatch]);

  return (
    <div className="flex flex-col w-160 mt-5">
      <div className="flex max-w-160 items-center justify-between w-full px-4">
        <h1 className="text-black dark:text-white font-semibold text-[20px]">
          Search
        </h1>
        {isLoggedIn ? (
          <button className="hover:opacity-70 transition cursor-pointer">
            <img
              src={Icons.iconMorePost}
              alt="More"
              className="w-6 h-6 dark:invert"
            />
          </button>
        ) : (
          <div className="w-6" />
        )}
      </div>
      <div className="w-full h-full max-w-160 mt-5 border-[#00000026] dark:border-[#2d2d2d] border rounded-3xl mb-14">
        <div className="w-full">
          <div className="font-medium text-gray-400 dark:text-zinc-500 p-4 text-sm">
            Follow suggestions
          </div>
          {loading && !suggestions?.length && (
            <div className="w-full flex items-center justify-center py-6">
              <Spinner />
            </div>
          )}
          {suggestions?.map((suggestion) => (
            <UsersSuggestions key={suggestion.id} user={suggestion} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UsersSuggestions from "@/layouts/DefaultLayout/components/UsersSuggestions";
import { getSuggestion } from "@/services/search/searchServer";
import { useCurrentUser } from "@/features/auth/hook";

import SearchInput from "@/layouts/DefaultLayout/components/Search";
import { Spinner } from "@/components/ui/spinner";
import Footer from "@/layouts/components/Footer";

function Search() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const { suggestions, searchResults, loading } = useSelector(
    (state) => state.search,
  );
  const currentUser = useCurrentUser();
  const isLoggedIn = Boolean(currentUser);

  useEffect(() => {
    dispatch(getSuggestion());
  }, [dispatch]);

  const isSearching = searchValue.trim().length >= 2;
  const hasUsers = searchResults?.users?.length > 0;
  const hasTopics = searchResults?.topics?.length > 0;
  const hasResults = hasUsers || hasTopics;

  return (
    <div className="flex flex-col w-160 mt-5">
      <div className="flex max-w-160 items-center justify-between w-full px-4">
        {isLoggedIn ? (
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ) : (
          <h1 className="text-black dark:text-white font-semibold text-[20px]">
            Search
          </h1>
        )}
      </div>

      <div className="w-full h-full max-w-160 mt-5 border-[#00000026] dark:border-[#2d2d2d] border rounded-3xl mb-14 overflow-hidden divide-y divide-gray-100 dark:divide-zinc-800/60">
        {isSearching && (
          <div className="w-full pb-2">
            {loading && (
              <div className="w-full flex items-center justify-center py-6">
                <Spinner />
              </div>
            )}

            {!loading && hasResults && (
              <div className="pt-2">
                {/* Topic Results */}
                {hasTopics && (
                  <div>
                    <div className="text-xs font-semibold text-gray-400 dark:text-zinc-500 px-4 pt-2 pb-1">
                      Topics
                    </div>
                    {searchResults.topics.map((topic, index) => (
                      <div
                        key={topic.id || index}
                        className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-zinc-800/60 font-medium text-sm text-black dark:text-white cursor-pointer transition flex items-center gap-2"
                      >
                        <span className="text-gray-400">#</span>
                        <span>{topic.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* User Results */}
                {hasUsers && (
                  <div>
                    <div className="text-xs font-semibold text-gray-400 dark:text-zinc-500 px-4 pt-2 pb-1">
                      Users
                    </div>
                    {searchResults.users.map((user) => (
                      <UsersSuggestions key={user.id} user={user} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {!loading && !hasResults && (
              <div className="p-6 text-center text-sm text-gray-400 dark:text-zinc-500">
                No results found for "{searchValue}"
              </div>
            )}
          </div>
        )}

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

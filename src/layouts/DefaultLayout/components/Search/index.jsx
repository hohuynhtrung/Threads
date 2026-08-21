import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchAll } from "@/services/search/searchServer";
import { clearSearchResults } from "@/features/search/searchSlice";
import SearchDropdownModal from "./SearchDropdownModal";
import Icons from "@/assets/icons";

function Search() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { searchResults, loading } = useSelector((state) => state.search);

  // Debounce tìm kiếm
  useEffect(() => {
    const trimmedQuery = searchValue.trim();

    if (trimmedQuery.length >= 2) {
      setIsOpenDropdown(true);
      const timer = setTimeout(() => {
        dispatch(
          getSearchAll({
            q: trimmedQuery,
            page: 1,
            per_page_users: 5,
            per_page_topics: 5,
          }),
        );
      }, 400);

      return () => clearTimeout(timer);
    } else {
      dispatch(clearSearchResults());
      setIsOpenDropdown(false);
    }
  }, [searchValue, dispatch]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasUsers = searchResults?.users?.length > 0;
  const hasTopics = searchResults?.topics?.length > 0;
  const hasResults = hasUsers || hasTopics;

  return (
    <div
      ref={dropdownRef}
      className="relative flex items-center justify-between gap-3 w-full pr-4"
    >
      {/* Input Field */}
      <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-zinc-800 rounded-[25px] focus-within:border-gray-300 dark:focus-within:border-zinc-700 transition">
        <img
          src={Icons.iconSearch}
          alt="Search"
          className="w-4 h-4 opacity-40 dark:invert shrink-0"
        />
        <input
          type="text"
          value={searchValue}
          onFocus={() =>
            searchValue.trim().length >= 2 && setIsOpenDropdown(true)
          }
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          className="w-full bg-transparent text-sm border-none outline-none placeholder-gray-400 dark:placeholder-zinc-500 text-black dark:text-white p-0 focus:ring-0"
        />
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue("");
              setIsOpenDropdown(false);
            }}
            className="text-xs text-gray-400 hover:text-black dark:hover:text-white cursor-pointer px-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Import Modal Dropdown vào đây */}
      {isOpenDropdown && (
        <SearchDropdownModal
          loading={loading}
          hasResults={hasResults}
          hasUsers={hasUsers}
          hasTopics={hasTopics}
          searchResults={searchResults}
          searchValue={searchValue}
          onClose={() => setIsOpenDropdown(false)}
        />
      )}

      {/* More Option Button */}
      <button className="hover:opacity-70 transition cursor-pointer p-1">
        <img
          src={Icons.iconMorePost}
          alt="More"
          className="w-6 h-6 dark:invert"
        />
      </button>
    </div>
  );
}

export default Search;

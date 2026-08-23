import UsersSuggestions from "@/layouts/DefaultLayout/components/UsersSuggestions";
import { Spinner } from "@/components/ui/spinner";

function SearchDropdownModal({
  loading,
  hasResults,
  hasUsers,
  hasTopics,
  searchResults,
  searchValue,
  onClose,
}) {
  return (
    <div className="absolute top-full left-0 right-12 mt-2 bg-white dark:bg-[#181818] border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl max-h-105 overflow-y-auto z-50 transition-all">
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-6">
          <Spinner />
        </div>
      )}

      {/* Dữ liệu tìm kiếm */}
      {!loading && hasResults && (
        <div className="py-2">
          {hasTopics && (
            <div className="pt-2">
              <div className="text-xs font-semibold text-gray-400 dark:text-zinc-500 px-4 pb-1">
                Topics
              </div>
              {searchResults.topics.map((topic, index) => (
                <div
                  key={topic.id || index}
                  onClick={onClose}
                  className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-zinc-800/60 font-medium text-sm text-black dark:text-white cursor-pointer transition flex items-center gap-2"
                >
                  <span className="text-gray-400">#</span>
                  <span>{topic.name}</span>
                </div>
              ))}
            </div>
          )}

          {hasUsers && (
            <div>
              <div className="text-xs font-semibold text-gray-400 dark:text-zinc-500 px-4 pt-2 pb-1">
                Users
              </div>
              {searchResults.users.map((user) => (
                <div key={user.id} onClick={onClose}>
                  <UsersSuggestions user={user} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Không tìm thấy kết quả */}
      {!loading && !hasResults && (
        <div className="p-6 text-center text-sm text-gray-400 dark:text-zinc-500">
          No results found for "{searchValue}"
        </div>
      )}
    </div>
  );
}

export default SearchDropdownModal;

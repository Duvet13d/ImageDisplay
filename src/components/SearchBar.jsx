import React from 'react'
import { motion } from 'framer-motion'
import { Search, X, Filter } from 'lucide-react'

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedTags, 
  allTags, 
  onTagToggle,
  isLanguageChinese 
}) => {
  const clearFilters = () => {
    setSearchQuery('')
    selectedTags.forEach(tag => onTagToggle(tag))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6}}
      className="mb-8 space-y-6 will-change-transform"
    >
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isLanguageChinese ? '搜索圖片、標籤或描述...' : 'Search images, tags, or descriptions...'}
          className="block w-full pl-12 pr-12 py-4 border-0 rounded-2xl bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-xl text-lg"
        />
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
          </motion.button>
        )}
      </div>

      {/* Tag Filters */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {isLanguageChinese ? '標籤篩選' : 'Filter by Tags'}
            </h3>
            {selectedTags.length > 0 && (
              <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {selectedTags.length}
              </span>
            )}
          </div>
          
          {(searchQuery || selectedTags.length > 0) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:bg-white/90 dark:hover:bg-gray-900/90 transition-all duration-300 shadow-lg"
            >
              {isLanguageChinese ? '清除全部' : 'Clear All'}
            </motion.button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {allTags.map((tag, index) => {
            const isSelected = selectedTags.includes(tag)
            return (
              <motion.button
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.10 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onTagToggle(tag)}
                className={`tag-button ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white shadow-xl border border-blue-400/30'
                    : 'bg-white/70 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-900/90 backdrop-blur-xl shadow-lg'
                }`}
              >
                {tag}
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default SearchBar 
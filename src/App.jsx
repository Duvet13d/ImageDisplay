import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ImageGrid from './components/ImageGrid'
import ImageModal from './components/ImageModal'
import { imageData } from './data/images'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLanguageChinese, setIsLanguageChinese] = useState(false)

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('darkMode', !isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  // Get all unique tags from images
  const allTags = useMemo(() => {
    const tags = new Set()
    imageData.forEach(image => {
      image.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [])

  // Filter images based on search query and selected tags
  const filteredImages = useMemo(() => {
    return imageData.filter(image => {
      const matchesSearch = searchQuery === '' || 
        image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.name_zh.includes(searchQuery) ||
        image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.description_zh.includes(searchQuery) ||
        image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => image.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [searchQuery, selectedTags])

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'dark bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'
    }`}>
      <div className="min-h-screen bg-white/30 dark:bg-black/30 backdrop-blur-sm">
        <Header 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isLanguageChinese={isLanguageChinese}
          setIsLanguageChinese={setIsLanguageChinese}
        />
        
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold gradient-text pb-4 tracking-tight">
              {isLanguageChinese ? '圖片展示' : 'Image Showcase'}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto font-medium leading-relaxed">
              {isLanguageChinese 
                ? '探索我們精美的圖片收藏，支援搜尋和標籤篩選功能'
                : 'Rapidly discover and explore beautiful images without ever leaving your browser'
              }
            </p>
          </motion.div>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            allTags={allTags}
            onTagToggle={handleTagToggle}
            isLanguageChinese={isLanguageChinese}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8}}
          >
            <ImageGrid
              images={filteredImages}
              onImageClick={setSelectedImage}
              isLanguageChinese={isLanguageChinese}
            />
          </motion.div>

          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {isLanguageChinese ? '未找到圖片' : 'No Images Found'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {isLanguageChinese 
                  ? '請嘗試調整您的搜尋條件或清除篩選器'
                  : 'Try adjusting your search terms or clearing the filters'
                }
              </p>
            </motion.div>
          )}
        </main>

        {selectedImage && (
          <ImageModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
            isLanguageChinese={isLanguageChinese}
          />
        )}
      </div>
    </div>
  )
}

export default App 
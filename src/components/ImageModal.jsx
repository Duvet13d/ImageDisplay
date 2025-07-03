import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Eye, Calendar, User, Tag, Image as ImageIcon } from 'lucide-react'

const ImageModal = ({ image, onClose, isLanguageChinese }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [viewingFullRes, setViewingFullRes] = useState(false)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleDownload = async () => {
    try {
      const response = await fetch(image.jpgUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${image.name.replace(/\s+/g, '_')}_full_resolution.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const toggleImageResolution = () => {
    setViewingFullRes(!viewingFullRes)
    setImageLoaded(false)
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-7xl max-h-[90vh] w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                {isLanguageChinese ? image.name_zh : image.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {isLanguageChinese ? image.description_zh : image.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {/* Resolution Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleImageResolution}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 backdrop-blur-xl border shadow-lg ${
                  viewingFullRes
                    ? 'bg-blue-500/90 text-white border-blue-400/50 shadow-blue-500/25'
                    : 'bg-white/70 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-900/90'
                }`}
                title={viewingFullRes 
                  ? (isLanguageChinese ? '切換到WebP預覽' : 'Switch to WebP preview')
                  : (isLanguageChinese ? '切換到高解析度JPG' : 'Switch to full resolution JPG')
                }
              >
                <ImageIcon className="w-4 h-4" />
                <span>{viewingFullRes ? 'JPG' : 'WebP'}</span>
              </motion.button>

              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="modern-button"
                title={isLanguageChinese ? '下載JPG檔案' : 'Download JPG file'}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isLanguageChinese ? '下載' : 'Download'}
                </span>
              </motion.button>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 rounded-xl bg-white/70 dark:bg-gray-900/70 text-gray-600 dark:text-gray-400 hover:bg-white/90 dark:hover:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 shadow-lg"
                title={isLanguageChinese ? '關閉' : 'Close'}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)]">
            {/* Image Section */}
            <div className="flex-1 relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
              <div className="relative max-w-full max-h-full">
                <img
                  src={viewingFullRes ? image.jpgUrl : image.webpUrl}
                  alt={isLanguageChinese ? image.name_zh : image.name}
                  className={`max-w-full max-h-full object-contain rounded-lg transition-all duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                
                {/* Loading indicator */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {/* Resolution indicator */}
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm">
                    {viewingFullRes ? 'High Resolution JPG' : 'Optimized WebP'}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Panel */}
            <div className="lg:w-80 p-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-gray-200/50 dark:border-gray-700/50 overflow-y-auto">
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {isLanguageChinese ? '圖片資訊' : 'Image Details'}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {isLanguageChinese ? '攝影師：' : 'Photographer:'}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {image.photographer}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {isLanguageChinese ? '拍攝日期：' : 'Date taken:'}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Date(image.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                    {isLanguageChinese ? '描述' : 'Description'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {isLanguageChinese ? image.description_zh : image.description}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                      {isLanguageChinese ? '標籤' : 'Tags'}
                    </h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 dark:from-blue-400/30 dark:via-purple-400/30 dark:to-cyan-400/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Format Info */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                    {isLanguageChinese ? '格式資訊' : 'Format Information'}
                  </h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {isLanguageChinese ? '預覽格式：' : 'Preview format:'}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">WebP</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        {isLanguageChinese ? '下載格式：' : 'Download format:'}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">JPG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default ImageModal 
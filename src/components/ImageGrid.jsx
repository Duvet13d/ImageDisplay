import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Download, Calendar, User, Tag } from 'lucide-react'

const ImageCard = ({ image, onClick, index, isLanguageChinese }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [dominantColor, setDominantColor] = useState('rgba(59, 130, 246, 0.8)') // Default blue
  const canvasRef = React.useRef(null)

  const extractDominantColor = (imgElement) => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 100
      canvas.height = 100
      
      ctx.drawImage(imgElement, 0, 0, 100, 100)
      const imageData = ctx.getImageData(0, 0, 100, 100)
      const data = imageData.data
      
      let r = 0, g = 0, b = 0
      const pixelCount = data.length / 4
      
      for (let i = 0; i < data.length; i += 4) {
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
      }
      
      r = Math.floor(r / pixelCount)
      g = Math.floor(g / pixelCount)
      b = Math.floor(b / pixelCount)
      
             return `rgba(${r}, ${g}, ${b}, 0.8)`
    } catch (error) {
      console.error('Color extraction failed:', error)
             return 'rgba(59, 130, 246, 0.8)' // Fallback to blue
    }
  }

  const handleImageLoad = (e) => {
    setImageLoaded(true)
    const color = extractDominantColor(e.target)
    setDominantColor(color)
  }

  const handleDownload = async (e) => {
    e.stopPropagation()
    try {
      const response = await fetch(image.jpgUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${image.name.replace(/\s+/g, '_')}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
              whileHover={{ y: -6, scale: 1.01 }}
      className="group cursor-pointer"
      onClick={() => onClick(image)}
    >
      <div 
        className="modern-card overflow-hidden image-glow"
        style={{
          '--glow-shadow': imageLoaded 
            ? `0 0 60px 10px ${dominantColor}, 0 0 100px 20px ${dominantColor.replace('0.8', '0.4')}, 0 25px 50px -12px rgba(0,0,0,0.25)`
            : 'none'
        }}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {!imageError ? (
            <>
                              <img
                  src={image.webpUrl}
                  alt={isLanguageChinese ? image.name_zh : image.name}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                  onLoad={handleImageLoad}
                  onError={() => setImageError(true)}
                  loading="lazy"
                  crossOrigin="anonymous"
                />
              
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <div className="text-center">
                <div className="text-4xl mb-2">🖼️</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isLanguageChinese ? '無法載入圖片' : 'Failed to load image'}
                </p>
              </div>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                onClick(image)
              }}
              className="p-2.5 bg-white/90 backdrop-blur-xl rounded-xl text-gray-800 hover:bg-white border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
              title={isLanguageChinese ? '查看詳情' : 'View Details'}
            >
              <Eye className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="p-2.5 bg-white/90 backdrop-blur-xl rounded-xl text-gray-800 hover:bg-white border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
              title={isLanguageChinese ? '下載 JPG' : 'Download JPG'}
            >
              <Download className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Tags overlay */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex flex-wrap gap-1">
              {image.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs bg-white/90 backdrop-blur-xl rounded-full text-gray-800 font-medium border border-white/50 shadow-md"
                >
                  {tag}
                </span>
              ))}
              {image.tags.length > 3 && (
                <span className="px-2.5 py-1 text-xs bg-white/90 backdrop-blur-xl rounded-full text-gray-800 font-medium border border-white/50 shadow-md">
                  +{image.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1 tracking-tight">
            {isLanguageChinese ? image.name_zh : image.name}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
            {isLanguageChinese ? image.description_zh : image.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{image.photographer}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(image.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ImageGrid = ({ images, onImageClick, isLanguageChinese }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          onClick={onImageClick}
          index={index}
          isLanguageChinese={isLanguageChinese}
        />
      ))}
    </div>
  )
}

export default ImageGrid 
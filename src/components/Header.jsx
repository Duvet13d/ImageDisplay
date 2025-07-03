import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Globe } from 'lucide-react'

const Header = ({ isDarkMode, toggleDarkMode, isLanguageChinese, setIsLanguageChinese }) => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="glass-effect sticky top-0 z-40 border-b border-gray-200/50 dark:border-gray-800/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">📸</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                {isLanguageChinese ? 'Gallery' : 'Gallery'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {isLanguageChinese ? '現代圖片展示' : 'Modern Showcase'}
              </p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLanguageChinese(!isLanguageChinese)}
              className="px-3 py-2 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-900/90 transition-all duration-300 shadow-lg"
              title={isLanguageChinese ? '切換到英文' : 'Switch to Chinese'}
            >
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isLanguageChinese ? 'EN' : '中文'}
                </span>
              </div>
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-900/90 transition-all duration-300 shadow-lg"
              title={isDarkMode ? (isLanguageChinese ? '切換到亮色模式' : 'Switch to light mode') : (isLanguageChinese ? '切換到暗色模式' : 'Switch to dark mode')}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header 
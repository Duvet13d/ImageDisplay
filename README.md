# 🎨 Image Showcase - Modern Gallery

A beautiful, responsive image gallery built with React and Tailwind CSS, featuring search capabilities, tag filtering, dark mode, and multilingual support.

## ✨ Features

- 🖼️ **Responsive Grid Layout** - Adapts perfectly to desktop, tablet, and mobile
- 🔍 **Smart Search & Filtering** - Search by image names, descriptions, or tags
- 🌙 **Dark Mode Support** - Toggle between light and dark themes
- 🌏 **Multilingual** - Support for English and Chinese (Traditional)
- ⚡ **Performance Optimized** - WebP format for fast loading, JPG for downloads
- 🎭 **Beautiful Animations** - Smooth transitions and staggered loading effects
- 📱 **Modern UI/UX** - Glass effects, gradients, and rounded corners
- 📥 **Download Functionality** - Download images in high-resolution JPG format

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Inter + Noto Sans TC (Google Fonts)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ImagesDisplay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation with theme toggle
│   ├── SearchBar.jsx   # Search and tag filtering
│   ├── ImageGrid.jsx   # Responsive image grid
│   └── ImageModal.jsx  # Full-size image viewer
├── data/
│   └── images.js       # Image data and metadata
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind
```

## 🎯 Customization

### Adding Your Images

1. **Edit the image data** in `src/data/images.js`
2. **Replace the sample URLs** with your own image hosting URLs
3. **Update metadata** including names, descriptions, tags, and photographer info

### Image Hosting Options

- **Cloudinary** (Recommended) - Automatic WebP conversion and optimization
- **Firebase Storage** - Good integration with Google services  
- **GitHub Raw Links** - Free but slower loading
- **Any CDN** - As long as it supports both WebP and JPG formats

### Styling

The project uses Tailwind CSS with custom utilities defined in `src/index.css`:

- `.gradient-bg` - Primary gradient background
- `.gradient-text` - Gradient text effect
- `.glass-effect` - Glassmorphism effect
- `.image-card` - Image card hover animations

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository** to Vercel
2. **Deploy automatically** on every push
3. **Custom domain** - Add your domain in Vercel settings

### Netlify

1. **Drag and drop** the `dist` folder to Netlify
2. **Or connect** your Git repository for automatic deployments

### GitHub Pages

1. **Install gh-pages**: `npm install --save-dev gh-pages`
2. **Add script** to package.json: `"deploy": "gh-pages -d dist"`
3. **Deploy**: `npm run build && npm run deploy`

## 🎨 Design Features

### Color Scheme
- **Light Mode**: Blue to purple gradients with clean whites
- **Dark Mode**: Deep grays with purple accents
- **Accent Colors**: Blue to purple gradients for interactive elements

### Typography
- **Primary Font**: Inter (Clean, modern sans-serif)
- **Chinese Support**: Noto Sans TC
- **Font Weights**: 400, 500, 600, 700

### Animations
- **Page Load**: Staggered fade-in animations
- **Hover Effects**: Scale and shadow transformations
- **Modal Transitions**: Spring-based animations
- **Loading States**: Skeleton screens and spinners

## 🔧 Configuration

### Environment Variables

Create a `.env` file for any configuration:

```env
# Optional: Analytics tracking ID
VITE_ANALYTICS_ID=your_analytics_id

# Optional: Image CDN base URL
VITE_CDN_BASE_URL=https://your-cdn.com
```

## 📱 Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for the sample images
- [Lucide](https://lucide.dev) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

---

Made with ❤️ and modern web technologies

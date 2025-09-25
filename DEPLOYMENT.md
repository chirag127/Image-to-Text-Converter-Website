# Deployment Guide

This guide explains how to deploy the Free OCR application to free hosting platforms.

## 🌐 Live Application

- **Frontend**: https://image-to-text-converter-website.vercel.app
- **Backend**: https://image-to-text-converter-backend.onrender.com
- **Repository**: https://github.com/chirag127/Image-to-Text-Converter-Website

## 🚀 Deploy Your Own Instance

### Frontend Deployment (Vercel)

1. **Fork the Repository**
   - Go to https://github.com/chirag127/Image-to-Text-Converter-Website
   - Click "Fork" to create your own copy

2. **Deploy to Vercel**
   - Visit https://vercel.com
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your forked repository
   - Set these configurations:
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Environment Variables**
   - Add environment variable:
     - `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.onrender.com/api`)

4. **Deploy**
   - Click "Deploy"
   - Your frontend will be live at `https://your-project.vercel.app`

### Backend Deployment (Render)

1. **Create Render Account**
   - Visit https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `your-ocr-backend`
     - **Root Directory**: `backend`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Environment Variables**
   Add these environment variables:
   ```
   NODE_ENV=production
   PORT=10000
   MAX_UPLOAD_MB=10
   RATE_LIMIT_MAX=20
   RATE_LIMIT_WINDOW=3600000
   LOG_LEVEL=info
   ```

   **Important**: Make sure to use `npm ci` instead of `npm install` for consistent builds.

4. **Deploy**
   - Click "Create Web Service"
   - Your backend will be live at `https://your-ocr-backend.onrender.com`

### Update Frontend Configuration

After deploying the backend, update your frontend's environment variable:
- In Vercel dashboard → Settings → Environment Variables
- Update `VITE_API_URL` to your Render backend URL

## 🔧 Alternative Platforms

### Frontend Alternatives
- **Netlify**: Similar to Vercel, drag-and-drop deployment
- **GitHub Pages**: Free static hosting
- **Surge.sh**: Simple command-line deployment

### Backend Alternatives
- **Railway**: Similar to Render with free tier
- **Heroku**: Free tier discontinued, but still popular
- **Fly.io**: Modern platform with free allowance

## 🐳 Docker Deployment

### Using Docker Compose
```bash
# Clone repository
git clone https://github.com/chirag127/Image-to-Text-Converter-Website.git
cd Image-to-Text-Converter-Website

# Build and run
docker-compose up --build
```

### Individual Containers
```bash
# Backend
docker build -t ocr-backend ./backend
docker run -p 3000:3000 ocr-backend

# Frontend
docker build -t ocr-frontend ./frontend
docker run -p 80:80 ocr-frontend
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit API keys to Git
2. **CORS**: Update allowed origins in backend for production
3. **Rate Limiting**: Adjust limits based on expected traffic
4. **File Size**: Monitor upload limits to prevent abuse

## 📊 Monitoring

### Free Monitoring Tools
- **Render**: Built-in metrics and logs
- **Vercel**: Analytics and performance insights
- **Sentry**: Error tracking (free tier)
- **UptimeRobot**: Uptime monitoring

## 🚨 Troubleshooting

### Common Issues

1. **TypeScript Build Errors**
   - Ensure `@types/node` and `typescript` are in dependencies (not devDependencies)
   - Use Node.js version 18+ for compatibility
   - Run `npm ci` instead of `npm install`

2. **CORS Errors**
   - Update backend CORS configuration
   - Ensure frontend URL is in allowed origins

3. **Build Failures**
   - Check Node.js version compatibility (use 18.x or 20.x)
   - Verify all dependencies are installed
   - Clear node_modules and reinstall if needed

4. **API Timeouts**
   - Increase timeout limits in frontend (currently 60s)
   - Optimize OCR processing
   - Use smaller test images initially

5. **Memory Issues**
   - Use smaller images for testing
   - Monitor memory usage on free tiers
   - Render free tier has 512MB RAM limit

## 📈 Scaling

### Performance Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement caching strategies
- Optimize image processing

### Upgrading Plans
- **Vercel Pro**: Better performance, more builds
- **Render Starter**: More memory and CPU
- **Custom VPS**: Full control and scaling

---

**Need Help?** Open an issue at https://github.com/chirag127/Image-to-Text-Converter-Website/issues
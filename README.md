# Free OCR - AI-Powered Image-to-Text Converter

A free, open-source web application that converts images to editable text using OCR (Optical Character Recognition) and AI post-processing. Built with privacy and performance in mind.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen?style=for-the-badge&logo=vercel)](https://image-to-text-converter-website.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/chirag127/Image-to-Text-Converter-Website)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

## 🌐 Live Demo

**🚀 Try it now:** [https://image-to-text-converter-website.vercel.app](https://image-to-text-converter-website.vercel.app)

- **Frontend**: Deployed on Vercel ✅
- **Backend API**: Deployed on Render ✅
- **Status**: Fully Operational 🟢

## 🚀 Features

- **Free & Open Source**: No registration, no limits, completely free
- **AI-Enhanced OCR**: Uses Tesseract OCR with AI text correction
- **Multiple Formats**: Supports JPG, PNG, and PDF files up to 10MB
- **Privacy-First**: Images are processed locally and automatically deleted
- **Fast Processing**: Typically under 3 seconds per image
- **Mobile-Friendly**: Responsive design works on all devices
- **No Database**: Stateless architecture for maximum privacy

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for fast development
- **Heroicons** for UI icons

### Backend
- **Node.js** with TypeScript
- **Fastify** web framework
- **Tesseract.js** for OCR processing
- **Hugging Face** API for AI text correction

### Infrastructure
- **Docker** for containerization
- **GitHub Actions** for CI/CD
- **Vercel** for frontend hosting
- **DigitalOcean/Render** for backend hosting

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/chirag127/Image-to-Text-Converter-Website.git
   cd Image-to-Text-Converter-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This starts:
   - Backend API on http://localhost:3000
   - Frontend on http://localhost:5173

### Using Docker

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📝 API Documentation

### POST /api/ocr

Upload an image for OCR processing.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: Form data with 'file' field containing the image

**Response:**
```json
{
  "success": true,
  "text": "Raw OCR extracted text",
  "correctedText": "AI-corrected text with better accuracy",
  "processingTime": 2847
}
```

**Error Response:**
```json
{
  "error": "Invalid file type",
  "message": "Only JPG, PNG, and PDF files are supported"
}
```

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Run All Tests
```bash
npm test
```

## 🚀 Deployment

### Live Application
- **Frontend**: https://image-to-text-converter-website.vercel.app (Vercel)
- **Backend API**: https://image-to-text-converter-backend.onrender.com (Render)

### Deploy Your Own
📖 **[Complete Deployment Guide](DEPLOYMENT.md)** - Step-by-step instructions for deploying to free platforms

**Quick Deploy:**
```bash
# Test builds locally first
.\test-build.ps1

# Get deployment checklist
node deploy-setup.js
```

1. Fork this repository
2. Deploy frontend to [Vercel](https://vercel.com) (set root directory to `frontend`)
3. Deploy backend to [Render](https://render.com) (set root directory to `backend`)
4. Update frontend environment variables with your backend URL

**Docker:**
```bash
docker-compose up --build
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 3000 |
| `NODE_ENV` | Environment mode | development |
| `HUGGINGFACE_API_KEY` | HuggingFace API key (optional) | - |
| `MAX_UPLOAD_MB` | Maximum file size in MB | 10 |
| `RATE_LIMIT_MAX` | Max requests per IP per hour | 20 |

### Optional: Hugging Face API

For enhanced AI text correction, get a free API key from [Hugging Face](https://huggingface.co/settings/tokens) and add it to your `.env` file:

```bash
HUGGINGFACE_API_KEY=your_api_key_here
```

## 📊 Performance

- **Processing Time**: < 3 seconds for 5MB images
- **Accuracy**: 90%+ for clear English text
- **File Size Limit**: 10MB per upload
- **Rate Limiting**: 20 requests per IP per hour
- **Supported Formats**: JPG, PNG, PDF

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) for the OCR engine
- [Hugging Face](https://huggingface.co/) for AI models
- [React](https://reactjs.org/) and [Fastify](https://www.fastify.io/) communities

## 📞 Support

- 🐛 [Report Issues](https://github.com/chirag127/Image-to-Text-Converter-Website/issues)
- 💬 [Discussions](https://github.com/chirag127/Image-to-Text-Converter-Website/discussions)
- 🌐 [Live Demo](https://image-to-text-converter-website.vercel.app)

---

Made with ❤️ for the open source community
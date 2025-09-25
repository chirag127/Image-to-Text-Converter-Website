#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Free OCR Deployment Setup');
console.log('============================\n');

// Check if this is a fresh clone
const packageJsonExists = fs.existsSync('package.json');
if (!packageJsonExists) {
  console.error('❌ Please run this script from the project root directory');
  process.exit(1);
}

console.log('✅ Project structure verified');

// Create deployment checklist
const checklist = `
📋 DEPLOYMENT CHECKLIST

Frontend (Vercel):
□ 1. Fork repository on GitHub
□ 2. Connect to Vercel (https://vercel.com)
□ 3. Set root directory to 'frontend'
□ 4. Deploy and get URL

Backend (Render):
□ 1. Create account on Render (https://render.com)
□ 2. Create new Web Service
□ 3. Set root directory to 'backend'
□ 4. Add environment variables:
   - NODE_ENV=production
   - PORT=10000
   - MAX_UPLOAD_MB=10
   - RATE_LIMIT_MAX=20
□ 5. Deploy and get URL

Final Steps:
□ 1. Update frontend VITE_API_URL with backend URL
□ 2. Update backend CORS with frontend URL
□ 3. Test the application
□ 4. Share your deployment! 🎉

Need help? Check DEPLOYMENT.md or open an issue.
`;

console.log(checklist);

// Create a deployment config template
const deployConfig = {
  frontend: {
    platform: "vercel",
    rootDirectory: "frontend",
    buildCommand: "npm run build",
    outputDirectory: "dist",
    environmentVariables: {
      VITE_API_URL: "YOUR_BACKEND_URL/api"
    }
  },
  backend: {
    platform: "render",
    rootDirectory: "backend",
    buildCommand: "npm install && npm run build",
    startCommand: "npm start",
    environmentVariables: {
      NODE_ENV: "production",
      PORT: "10000",
      MAX_UPLOAD_MB: "10",
      RATE_LIMIT_MAX: "20"
    }
  }
};

fs.writeFileSync('deployment-config.json', JSON.stringify(deployConfig, null, 2));
console.log('📄 Created deployment-config.json with your settings');

console.log('\n🎯 Next Steps:');
console.log('1. Read DEPLOYMENT.md for detailed instructions');
console.log('2. Deploy frontend to Vercel');
console.log('3. Deploy backend to Render');
console.log('4. Update environment variables');
console.log('\n🌟 Good luck with your deployment!');
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building OCR Backend...');

try {
  // Ensure logs directory exists
  const logsDir = path.join(__dirname, 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
    console.log('📁 Created logs directory');
  }

  // Clean dist directory
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
    console.log('🧹 Cleaned dist directory');
  }

  // Run TypeScript compilation
  console.log('📦 Compiling TypeScript...');
  execSync('npx tsc', { stdio: 'inherit', cwd: __dirname });

  console.log('✅ Build completed successfully!');

  // Verify build output
  const serverJs = path.join(distDir, 'server.js');
  if (fs.existsSync(serverJs)) {
    console.log('✅ server.js created successfully');
  } else {
    throw new Error('server.js not found in dist directory');
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
Write-Host "🧪 Testing Build Process..." -ForegroundColor Cyan

# Test backend build
Write-Host "Testing Backend Build..." -ForegroundColor Yellow
Set-Location backend

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Gray
npm ci

# Run build
Write-Host "Running build..." -ForegroundColor Gray
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Backend build failed!" -ForegroundColor Red
    exit 1
}

# Test if server.js exists
if (Test-Path "dist/server.js") {
    Write-Host "✅ server.js created successfully" -ForegroundColor Green
} else {
    Write-Host "❌ server.js not found" -ForegroundColor Red
    exit 1
}

Set-Location ..

# Test frontend build
Write-Host "Testing Frontend Build..." -ForegroundColor Yellow
Set-Location frontend

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Gray
npm ci

# Run build
Write-Host "Running build..." -ForegroundColor Gray
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}

# Test if dist exists
if (Test-Path "dist") {
    Write-Host "✅ Frontend dist directory created" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend dist directory not found" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "🎉 All builds successful! Ready for deployment." -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Push to GitHub" -ForegroundColor White
Write-Host "2. Deploy backend to Render" -ForegroundColor White
Write-Host "3. Deploy frontend to Vercel" -ForegroundColor White
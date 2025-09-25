Write-Host "Restarting Backend Server..." -ForegroundColor Yellow

# Kill existing node processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Wait a moment
Start-Sleep -Seconds 2

# Start backend
Write-Host "Starting Backend Server..." -ForegroundColor Green
Set-Location backend
npm run dev
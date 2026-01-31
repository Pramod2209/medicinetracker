# Kill any existing Node processes
Write-Host "Stopping any existing Node processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Clear ports
Write-Host "Clearing ports..." -ForegroundColor Yellow
Get-NetTCPConnection -LocalPort 5000,5173 -ErrorAction SilentlyContinue | ForEach-Object { 
    Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue 
}
Start-Sleep -Seconds 2

# Start Backend
Write-Host "`nStarting Backend Server..." -ForegroundColor Green
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Admin\OneDrive\Desktop\mern project\backend'; npm start" -PassThru
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Green
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Admin\OneDrive\Desktop\mern project\frontend'; npm run dev" -PassThru

Write-Host "`nServers started successfully!" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "`nPress Ctrl+C to stop all servers" -ForegroundColor Yellow

# Keep script running
try {
    Wait-Process -Id $backend.Id
} finally {
    Write-Host "`nStopping all servers..." -ForegroundColor Yellow
    Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
}

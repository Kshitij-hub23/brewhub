@echo off
echo Starting BrewHub...

:: Get current WiFi IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    set RAW_IP=%%a
    goto :found
)
:found
:: Trim leading space
set IP=%RAW_IP: =%

echo Detected IP: %IP%

:: Update frontend .env
echo VITE_API_BASE_URL=http://%IP%:8000> "C:\Users\ASUS\Desktop\Hackathon - Coffee Project\Combined\brewhub_v3 (2)\.env"
echo Updated .env with IP: %IP%

:: Start backend in a new window
start "BrewHub Backend" cmd /k "cd /d "C:\Users\ASUS\Desktop\Hackathon - Coffee Project\Combined\Backend" && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

:: Small delay to let backend start
timeout /t 3 /nobreak >nul

:: Start frontend in a new window
start "BrewHub Frontend" cmd /k "cd /d "C:\Users\ASUS\Desktop\Hackathon - Coffee Project\Combined\brewhub_v3 (2)" && npm run dev -- --host"

echo.
echo ================================================
echo  Both servers are starting...
echo  Open on iPad: http://%IP%:5173
echo  Admin login:  http://%IP%:5173/admin/login
echo ================================================
echo.
pause

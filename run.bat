@echo off
:: Start the Node.js server in the background
start "" npm run dev

:: Wait for a couple of seconds to let the server spin up
timeout /t 2 /nobreak >nul

:: Open the frontend in the default browser
start http://localhost:5173
@echo off
:: Start the dev server in a minimized window, redirecting all output to a log
:: file. This avoids the Windows "QuickEdit Mode" trap (clicking the console
:: window pauses Node) and slow legacy-console rendering, both of which make the
:: app feel extremely slow when launched from a .bat instead of a real terminal.
start "3DGenStudio Dev" /min cmd /c "npm run dev > dev.log 2>&1"

:: Wait a few seconds to let Vite + the backend spin up
timeout /t 3 /nobreak >nul

:: Open the frontend in the default browser
start http://localhost:5173

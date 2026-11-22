@echo off
title Push Odisha to GitHub
color 0E

echo ===================================================================
echo   PUSHING ODISHA TO GITHUB
echo   Repository: https://github.com/shresthasrii/India_INC_OD.git
echo ===================================================================
echo.

cd /d "%~dp0"

echo [INFO] Running: git push -u origin main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ===================================================================
    echo [SUCCESS] Successfully pushed Odisha to GitHub!
    echo URL: https://github.com/shresthasrii/India_INC_OD
    echo ===================================================================
) else (
    echo.
    echo ===================================================================
    echo [NOTE] If a GitHub sign-in window or prompt appeared, please sign in
    echo with your GitHub account (shresthasrii).
    echo ===================================================================
)

echo.
pause

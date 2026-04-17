@echo off
REM Blair installer — copies the .claude agent bundle into your project
REM Usage: install.bat C:\path\to\your\project

setlocal enabledelayedexpansion

set "BLAIR_DIR=%~dp0"
set "BLAIR_DIR=%BLAIR_DIR:~0,-1%"
set "TARGET=%~1"

REM ── Resolve target ──────────────────────────────────────────────────────────

if "%TARGET%"=="" (
    echo.
    echo Blair — AI CMO Agent
    echo ────────────────────
    echo.
    set /p TARGET="Where is your project? (path, or press Enter for current directory): "
    if "!TARGET!"=="" set "TARGET=%CD%"
)

if not exist "%TARGET%" (
    echo Error: directory not found: %TARGET%
    exit /b 1
)

REM ── Safety checks ────────────────────────────────────────────────────────────

echo.
echo Installing Blair into: %TARGET%
echo.

if exist "%TARGET%\.claude" (
    echo A .claude directory already exists in this project.
    echo Blair will merge its agents and skills into it.
    echo Existing files with the same name will be overwritten.
    echo.
    set /p CONFIRM="Continue? (y/N): "
) else (
    set /p CONFIRM="Install Blair into %TARGET%? (y/N): "
)

if /i not "%CONFIRM%"=="y" (
    echo Cancelled.
    exit /b 0
)

REM ── Copy ────────────────────────────────────────────────────────────────────

echo.
echo Copying Blair agents and skills...

REM Agents
if not exist "%TARGET%\.claude\agents" mkdir "%TARGET%\.claude\agents"
xcopy /Y "%BLAIR_DIR%\.claude\agents\blair*.md" "%TARGET%\.claude\agents\" >nul

REM Skills
if not exist "%TARGET%\.claude\skills" mkdir "%TARGET%\.claude\skills"
for /d %%D in ("%BLAIR_DIR%\.claude\skills\blair-*") do (
    set "SKILL_NAME=%%~nxD"
    if not exist "%TARGET%\.claude\skills\!SKILL_NAME!" mkdir "%TARGET%\.claude\skills\!SKILL_NAME!"
    xcopy /Y "%%D\SKILL.md" "%TARGET%\.claude\skills\!SKILL_NAME!\" >nul
)

REM CMO directory
if not exist "%TARGET%\.claude\cmo" mkdir "%TARGET%\.claude\cmo"
xcopy /Y "%BLAIR_DIR%\.claude\cmo\brand.md.example" "%TARGET%\.claude\cmo\" >nul

if not exist "%TARGET%\.claude\cmo\campaigns.md" (
    xcopy /Y "%BLAIR_DIR%\.claude\cmo\campaigns.md" "%TARGET%\.claude\cmo\" >nul
)

if not exist "%TARGET%\.claude\cmo\insights.md" (
    xcopy /Y "%BLAIR_DIR%\.claude\cmo\insights.md" "%TARGET%\.claude\cmo\" >nul
)

REM Add to .gitignore if it exists
if exist "%TARGET%\.gitignore" (
    findstr /c:"cmo/brand.md" "%TARGET%\.gitignore" >nul 2>&1
    if errorlevel 1 (
        echo.>> "%TARGET%\.gitignore"
        echo # Blair — brand profiles contain private strategy and competitor intel>> "%TARGET%\.gitignore"
        echo .claude/cmo/brand.md>> "%TARGET%\.gitignore"
        echo .claude/cmo/brands/*/brand.md>> "%TARGET%\.gitignore"
        echo .claude/cmo/active-brand>> "%TARGET%\.gitignore"
        echo Added Blair entries to .gitignore
    )
)

REM ── Done ────────────────────────────────────────────────────────────────────

echo.
echo Blair installed successfully.
echo.
echo Next steps:
echo   1. Open %TARGET% in Claude Code
echo   2. Run /blair:start to set up your brand profile
echo   3. Start any marketing task — Blair handles the rest
echo.
echo Full command list: /blair:help
echo.

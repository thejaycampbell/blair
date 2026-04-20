$ErrorActionPreference = "Stop"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is required. Install from https://nodejs.org"
    exit 1
}

$target = if ($args[0]) { $args[0] } else { Get-Location }
npx --yes blair-cmo --ide cursor $target

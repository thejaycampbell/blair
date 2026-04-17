# Blair installer for Windows PowerShell
# One-liner: irm https://raw.githubusercontent.com/thejaycampbell/blair/main/install.ps1 | iex
# Or with target: & ([scriptblock]::Create((irm https://raw.githubusercontent.com/thejaycampbell/blair/main/install.ps1))) -Target C:\path\to\project

param(
  [string]$Target = ""
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "Blair -- AI CMO Agent"
Write-Host "--------------------"
Write-Host ""

# Resolve target
if (-not $Target) {
  $answer = Read-Host "Where is your project? (path, or press Enter for current directory)"
  $Target = if ($answer) { $answer } else { Get-Location }
}
$Target = Resolve-Path $Target -ErrorAction SilentlyContinue
if (-not $Target) {
  Write-Error "Error: directory not found: $Target"
  exit 1
}

Write-Host "Installing Blair into: $Target"
Write-Host ""

# Check for existing .claude
$claudeDir = Join-Path $Target ".claude"
if (Test-Path $claudeDir) {
  Write-Host "  A .claude directory already exists in this project."
  Write-Host "  Blair will merge its agents and skills into it."
  Write-Host "  Existing Blair files will be overwritten."
  Write-Host ""
  $confirm = Read-Host "Continue? (y/N)"
  if ($confirm -notmatch "^[yY]") { Write-Host "Cancelled."; exit 0 }
} else {
  $confirm = Read-Host "Install Blair into $Target? (y/N)"
  if ($confirm -notmatch "^[yY]") { Write-Host "Cancelled."; exit 0 }
}

# Download Blair via git or zip fallback
$tmpDir = Join-Path $env:TEMP "blair-install-$(Get-Random)"
$zipPath = "$tmpDir.zip"

Write-Host ""
Write-Host "Downloading Blair..."

try {
  Invoke-WebRequest "https://github.com/thejaycampbell/blair/archive/refs/heads/main.zip" -OutFile $zipPath
  Expand-Archive $zipPath -DestinationPath $tmpDir -Force
  $blairSrc = Join-Path $tmpDir "blair-main"
} catch {
  Write-Error "Download failed: $_"
  exit 1
}

Write-Host "Copying agents and skills..."

$blairClaude = Join-Path $blairSrc ".claude"

# Agents
$agentsDest = Join-Path $Target ".claude\agents"
New-Item -ItemType Directory -Path $agentsDest -Force | Out-Null
Get-ChildItem (Join-Path $blairClaude "agents") -Filter "blair*.md" | Copy-Item -Destination $agentsDest -Force

# Skills
$skillsDest = Join-Path $Target ".claude\skills"
Get-ChildItem (Join-Path $blairClaude "skills") -Directory -Filter "blair-*" | ForEach-Object {
  $dest = Join-Path $skillsDest $_.Name
  New-Item -ItemType Directory -Path $dest -Force | Out-Null
  Copy-Item (Join-Path $_.FullName "SKILL.md") -Destination $dest -Force
}

# CMO directory
$cmoDest = Join-Path $Target ".claude\cmo"
New-Item -ItemType Directory -Path $cmoDest -Force | Out-Null
$cmoSrc = Join-Path $blairClaude "cmo"
Copy-Item (Join-Path $cmoSrc "brand.md.example") -Destination $cmoDest -Force
Copy-Item (Join-Path $cmoSrc "stakeholders.md.example") -Destination $cmoDest -Force
foreach ($f in @("campaigns.md","insights.md","learnings.md")) {
  $dest = Join-Path $cmoDest $f
  if (-not (Test-Path $dest)) { Copy-Item (Join-Path $cmoSrc $f) -Destination $dest }
}

# .gitignore
$gitignorePath = Join-Path $Target ".gitignore"
if (Test-Path $gitignorePath) {
  $content = Get-Content $gitignorePath -Raw
  if ($content -notmatch "cmo/brand\.md") {
    $entries = @(
      "",
      "# Blair -- brand profiles contain private strategy and competitor intel",
      ".claude/cmo/brand.md",
      ".claude/cmo/brands/*/brand.md",
      ".claude/cmo/active-brand",
      ".claude/cmo/learnings.md",
      ".claude/cmo/stakeholders.md",
      ".claude/cmo/marquee.md",
      ".claude/cmo/pipeline.md"
    )
    Add-Content $gitignorePath ($entries -join "`n")
    Write-Host "  Added Blair entries to .gitignore"
  }
}

# Cleanup
Remove-Item $tmpDir -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item $zipPath -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "  Blair installed successfully."
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Open $Target in Claude Code"
Write-Host "  2. Run /blair:start to set up your brand profile"
Write-Host "  3. Start any marketing task -- Blair handles the rest"
Write-Host ""
Write-Host "Full command list: /blair:help"
Write-Host ""

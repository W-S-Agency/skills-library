# WS Workspace — Skills Library Installer
# Usage: .\install-skills.ps1 -Workspace "mt" -Skills "pcm,ws"
# Usage: .\install-skills.ps1 -Workspace "mt" -All

param(
    [Parameter(Mandatory=$true)]
    [string]$Workspace,
    
    [string]$Skills = "",
    
    [switch]$All,
    
    [switch]$List
)

$SKILLS_REPO = "https://github.com/W-S-Agency/skills-library.git"
$WORKSPACE_PATH = "$env:USERPROFILE\.ws-workspace\workspaces\$Workspace\skills"
$TEMP_DIR = "$env:TEMP\skills-library-install"

# Check workspace exists
if (-not (Test-Path $WORKSPACE_PATH)) {
    Write-Error "Workspace '$Workspace' not found at: $WORKSPACE_PATH"
    Write-Host "Available workspaces:"
    Get-ChildItem "$env:USERPROFILE\.ws-workspace\workspaces" -Directory | ForEach-Object { Write-Host "  - $($_.Name)" }
    exit 1
}

Write-Host "WS Workspace Skills Installer" -ForegroundColor Cyan
Write-Host "Workspace: $Workspace" -ForegroundColor Gray
Write-Host "Target: $WORKSPACE_PATH" -ForegroundColor Gray
Write-Host ""

# Clone/update skills-library
if (Test-Path $TEMP_DIR) {
    Write-Host "Updating skills-library..." -ForegroundColor Yellow
    git -C $TEMP_DIR pull --quiet 2>&1 | Out-Null
} else {
    Write-Host "Downloading skills-library..." -ForegroundColor Yellow
    git clone --quiet $SKILLS_REPO $TEMP_DIR 2>&1 | Out-Null
}

$SKILLS_SRC = "$TEMP_DIR\skills"

# List available skills
if ($List) {
    Write-Host "Available skills:" -ForegroundColor Cyan
    Get-ChildItem $SKILLS_SRC -Recurse -Filter "SKILL.md" | ForEach-Object {
        $skillName = $_.Directory.Name
        $category = $_.Directory.Parent.Name
        Write-Host "  $category/$skillName"
    }
    exit 0
}

# Find skills to install
$toInstall = @()

if ($All) {
    $toInstall = Get-ChildItem $SKILLS_SRC -Recurse -Filter "SKILL.md" | 
        Select-Object -ExpandProperty Directory
} else {
    $skillList = $Skills -split ","
    foreach ($skill in $skillList) {
        $skill = $skill.Trim()
        $found = Get-ChildItem $SKILLS_SRC -Recurse -Directory -Filter $skill
        if ($found) {
            $toInstall += $found
        } else {
            Write-Warning "Skill '$skill' not found in library"
        }
    }
}

if ($toInstall.Count -eq 0) {
    Write-Host "No skills to install. Use -List to see available skills." -ForegroundColor Yellow
    exit 0
}

# Install skills
$installed = 0
foreach ($skillDir in $toInstall) {
    $skillName = $skillDir.Name
    $dest = "$WORKSPACE_PATH\$skillName"
    
    if (Test-Path $dest) {
        Write-Host "  [UPDATE] $skillName" -ForegroundColor Yellow
    } else {
        Write-Host "  [NEW]    $skillName" -ForegroundColor Green
    }
    
    Copy-Item -Path $skillDir.FullName -Destination $dest -Recurse -Force
    $installed++
}

Write-Host ""
Write-Host "Installed $installed skill(s)" -ForegroundColor Green
Write-Host "Restart WS Workspace to activate" -ForegroundColor Cyan
Write-Host ""
Write-Host "Usage:"
Write-Host "  /pcm init    or    /ws init"

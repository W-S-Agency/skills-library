# Skills Library - 3-Day Sync Scheduler Setup
# PowerShell script to register Windows Task Scheduler job for 3-day synchronization
# Run as Administrator

# Configuration
$taskName = "SkillsLibrary3DaySync"
$taskDescription = "Syncs W-S-Agency/skills-library every 3 days at 09:00 UTC"
$scriptPath = "$HOME\skills-library\sync-3-days.sh"
$bashPath = "C:\Program Files\Git\bin\bash.exe"

# Verify script exists
if (-not (Test-Path $scriptPath)) {
    Write-Host "❌ ERROR: Script not found at $scriptPath" -ForegroundColor Red
    exit 1
}

Write-Host "🔧 Setting up 3-day sync for skills-library..." -ForegroundColor Cyan

# Check if task already exists
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existingTask) {
    Write-Host "⚠️  Task '$taskName' already exists. Removing..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Create task trigger (every 3 days at 09:00 UTC)
$trigger = New-ScheduledTaskTrigger -Once -At "09:00" -RepetitionInterval (New-TimeSpan -Days 3) -RepetitionDuration (New-TimeSpan -Days 36500)

# Create task action
$action = New-ScheduledTaskAction `
    -Execute $bashPath `
    -Argument "-c `"$scriptPath`""

# Create task settings
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -RunWithoutNetwork:$false `
    -ExecutionTimeLimit (New-TimeSpan -Hours 1) `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 5)

# Register the task
try {
    Register-ScheduledTask `
        -TaskName $taskName `
        -Description $taskDescription `
        -Trigger $trigger `
        -Action $action `
        -Settings $settings `
        -RunLevel Highest `
        -Force

    Write-Host "✅ Task registered successfully!" -ForegroundColor Green
    Write-Host "   Name: $taskName" -ForegroundColor Green
    Write-Host "   Schedule: Every 3 days at 09:00 UTC" -ForegroundColor Green
    Write-Host "   Script: $scriptPath" -ForegroundColor Green

} catch {
    Write-Host "❌ ERROR: Could not register task" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

# Verify task
Write-Host ""
Write-Host "🔍 Verifying task..." -ForegroundColor Cyan
$task = Get-ScheduledTask -TaskName $taskName
Write-Host "   Status: $($task.State)" -ForegroundColor Green

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next sync will run at:" -ForegroundColor Cyan
Write-Host "   $(([DateTime]::Now).AddDays(3).ToString('yyyy-MM-dd HH:00 UTC'))" -ForegroundColor Yellow
Write-Host ""
Write-Host "To manually trigger the sync, run:" -ForegroundColor Cyan
Write-Host "   Get-ScheduledTask -TaskName '$taskName' | Start-ScheduledTask" -ForegroundColor Yellow

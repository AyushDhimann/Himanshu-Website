$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$indexPath = Join-Path $projectDir 'index.html'
Start-Process $indexPath





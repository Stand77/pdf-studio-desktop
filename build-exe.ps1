# Builds a single portable PDF-Studio.exe into the dist folder.
# Run:  powershell -ExecutionPolicy Bypass -File .\build-exe.ps1
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
& "$PSScriptRoot\build.ps1"            # downloads the libraries into app\lib if needed
npm.cmd install
if ($LASTEXITCODE -ne 0) { throw 'npm install failed' }
npx.cmd electron-builder --win portable
if ($LASTEXITCODE -ne 0) { throw 'electron-builder failed' }
Write-Host ''
Write-Host 'Done. Your app is: dist\PDF-Studio.exe'

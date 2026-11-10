# Downloads the libraries into app\lib (first run only), then packs app\ into app.asar
$ErrorActionPreference = 'Stop'
$lib = Join-Path $PSScriptRoot 'app\lib'
New-Item -ItemType Directory -Force $lib | Out-Null
$files = @{
  'pdf.min.js'         = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
  'pdf.worker.min.js'  = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
  'pdf-lib.min.js'     = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'
  'jszip.min.js'       = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
  'fontkit.umd.min.js' = 'https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@1.1.1/dist/fontkit.umd.min.js'
}
foreach ($k in $files.Keys) {
  $out = Join-Path $lib $k
  if (-not (Test-Path $out)) { Write-Host "Downloading $k"; Invoke-WebRequest $files[$k] -OutFile $out }
}
npx.cmd --yes @electron/asar pack (Join-Path $PSScriptRoot 'app') (Join-Path $PSScriptRoot 'app.asar')
Write-Host "Built app.asar. Test without packing:  npx --yes electron .\app"

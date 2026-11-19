v1.5.0: Snap to text (green crosshair; hold Alt to bypass) and X / Check stamp tools.
PDF Studio desktop
0. run Set-ExecutionPolicy -Scope Process Bypass
1. Run in PowerShell from this folder:  .\build.ps1     (downloads libs once, creates app.asar)
2. Copy app.asar into <your electron runtime>\resources\  (replace the default app), or test with:  npx --yes electron .\app
Notes: Save opens a native Save As dialog. OCR (Claude-powered) is not available offline; Word/Excel export of text PDFs works.

v1.4.0: text now places where you click (blue crosshair shows the baseline and first letter), added text stays selectable/editable (Delete, arrow-key nudge), and Save no longer bakes text into the page.

Select text tool (drag a box over text to copy it) and Paste text (button or Ctrl+V, then click the page to place it).

To make a single portable exe:  powershell -ExecutionPolicy Bypass -File .\build-exe.ps1   (result: dist\PDF-Studio.exe)

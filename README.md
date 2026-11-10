# PDF Studio

A desktop PDF editor for Windows, built with Electron. Everything runs on your own computer, and your PDFs are never uploaded anywhere.

## Features

- View, annotate and edit PDFs (text, shapes, drawing, images, rewrite existing text)
- **Select text**: drag a box over text to copy it to the clipboard
- **Paste text**: press Ctrl+V (or use the button), then click the page to place it
- Load your own fonts (.ttf/.otf), including non-Latin scripts
- Merge and split pages
- Convert: page to PNG, PDF to text, PDF to Word, PDF to Excel (for PDFs with real text)

## Download

Get `PDF-Studio.exe` from the [Releases](../../releases) page. It is a single portable file: no install needed, just run it.

## Build it yourself

You need [Node.js](https://nodejs.org) on Windows.

Make a single portable exe:

```
powershell -ExecutionPolicy Bypass -File .\build-exe.ps1
```

The result is `dist\PDF-Studio.exe`.

To try the app without packaging it:

```
powershell -ExecutionPolicy Bypass -File .\build.ps1
npx.cmd --yes electron .\app
```

(`build.ps1` downloads the libraries into `app\lib` the first time.)

## Known limitations

- The OCR buttons (OCR → Text / Word) need Claude's own app environment and do not work in the standalone app.
- Annotating and text selection are blocked on rotated pages. Rotate the page back to 0° first.

## Libraries

Downloaded at build time: [pdf.js](https://github.com/mozilla/pdf.js), [pdf-lib](https://github.com/Hopding/pdf-lib), [JSZip](https://github.com/Stuk/jszip), [fontkit](https://github.com/foliojs/fontkit).

## License

MIT, see [LICENSE](LICENSE).

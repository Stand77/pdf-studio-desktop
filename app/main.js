const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const fs = require('fs'), path = require('path'), os = require('os');
function createWindow() {
  const w = new BrowserWindow({ width: 1300, height: 850, title: 'PDF Studio', autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false } });
  w.loadFile(path.join(__dirname, 'index.html'));
}
ipcMain.handle('save', async (e, name, data) => {
  const r = await dialog.showSaveDialog({ defaultPath: name });
  if (r.canceled || !r.filePath) return null;
  fs.writeFileSync(r.filePath, Buffer.from(data));
  return r.filePath;
});
ipcMain.handle('print', async (e, imgs, fit) => {
  const css = '@page{margin:0}html,body{margin:0;padding:0;background:#fff}img{display:block;margin:0 auto;break-after:page;page-break-after:always}img:last-child{break-after:auto;page-break-after:auto}' + (fit ? 'img{max-width:8in;max-height:10.4in}' : '');
  const html = '<!doctype html><meta charset="utf-8"><style>' + css + '</style>' +
    imgs.map(i => '<img src="' + i.u + '"' + (fit ? '' : ' style="width:' + i.w + 'px"') + '>').join('');
  const f = path.join(os.tmpdir(), 'pdfstudio-print-' + Date.now() + '.html');
  fs.writeFileSync(f, html);
  const w = new BrowserWindow({ show: false, webPreferences: { sandbox: true } });
  await w.loadFile(f);
  await new Promise(r => setTimeout(r, 500));
  return new Promise(res => w.webContents.print({ silent: false, printBackground: true, margins: { marginType: 'none' } }, (ok, why) => {
    w.destroy(); try { fs.unlinkSync(f); } catch (err) {} res({ ok, why });
  }));
});
ipcMain.handle('openpdf', async (e, name, data) => {
  const f = path.join(os.tmpdir(), name);
  fs.writeFileSync(f, Buffer.from(data));
  return shell.openPath(f);
});
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());

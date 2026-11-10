const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs'), path = require('path');
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
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());

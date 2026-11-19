const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desk', {
  saveFile: (name, data) => ipcRenderer.invoke('save', name, data),
  print: (imgs, fit) => ipcRenderer.invoke('print', imgs, fit),
  openPdf: (name, data) => ipcRenderer.invoke('openpdf', name, data)
});

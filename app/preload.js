const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desk', { saveFile: (name, data) => ipcRenderer.invoke('save', name, data) });

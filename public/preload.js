const { contextBridge, ipcRenderer } = require('electron');

// 通过 contextBridge 向渲染进程暴露安全的 API
contextBridge.exposeInMainWorld('electronAPI', {
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  getPlatform: () => process.platform
});
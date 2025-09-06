const { contextBridge, ipcRenderer } = require('electron');

// 通过 contextBridge 向渲染进程暴露安全的 API
contextBridge.exposeInMainWorld('electronAPI', {
  openDialog: (options) => ipcRenderer.invoke('dialog-open', options),
  openMessageBox: (options) => ipcRenderer.invoke('dialog-message-box', options),
  getPath: (pathName) => ipcRenderer.invoke('get-path', pathName),
  pathJoin: (...args) => ipcRenderer.invoke('path-join', ...args),
  pathBasename: (filePath) => ipcRenderer.invoke('path-basename', filePath),
  pathDirname: (filePath) => ipcRenderer.invoke('path-dirname', filePath),
  pathExtname: (filePath) => ipcRenderer.invoke('path-extname', filePath),
  readFile: (pathD) => ipcRenderer.invoke('read-file', pathD),
  writeFile: (pathD, content) => ipcRenderer.invoke('write-file', pathD, content),
  renameFile: (pathD, newPath) => ipcRenderer.invoke('rename-file', pathD, newPath),
  deleteFile: (pathD) => ipcRenderer.invoke('delete-file', pathD),
  readStore: (key) => ipcRenderer.invoke('store-get', key),
  writeStore: (key, value) => ipcRenderer.invoke('store-set', key, value),
  deleteStore: (key) => ipcRenderer.invoke('store-delete', key),
  clearStore: () => ipcRenderer.invoke('store-clear'),
  openContextMenu: (options) => {
    return ipcRenderer.invoke('context-menu', options)
  },
});
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // 禁用 nodeIntegration 以提高安全性
      contextIsolation: true, // 启用上下文隔离
      enableRemoteModule: false, // 禁用 remote 模块
      preload: path.join(__dirname, 'preload.js'), // 指定预加载脚本
      //sandbox: false // 显式禁用沙盒
    },
  });

  // 加载应用
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
    // 注册 IPC 处理器
  ipcMain.handle('get-path', (event, pathName) => {
    return app.getPath(pathName); // 返回指定路径
  });

  ipcMain.handle('path-join', (event, ...args) => {
    return path.join(...args); // 使用 path.join 拼接路径
  });

  ipcMain.handle('path-basename', (event, filePath) => {
    return path.basename(filePath); // 获取文件名
  });

  ipcMain.handle('path-dirname', (event, filePath) => {
    return path.dirname(filePath); // 获取目录名
  });

  ipcMain.handle('path-extname', (event, filePath) => {
    return path.extname(filePath); // 获取扩展名
  });

  ipcMain.handle('read-file', (event, path) => {
    return fs.readFileSync(path, 'utf-8');
  });

  ipcMain.handle('write-file', (event, path, content) => {
    fs.writeFileSync(path, content, 'utf-8');
  });

  ipcMain.handle('rename-file', (event, path, newPath) => {
    fs.renameSync(path, newPath);
  });

  ipcMain.handle('delete-file', (event, path) => {
    fs.unlinkSync(path);
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
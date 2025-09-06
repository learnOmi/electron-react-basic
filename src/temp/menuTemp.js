const { shell } = require('electron')

const temp = [
    {
        label: '文件',
        submenu: [
            {
                label: '新建',
                accelerator: 'Ctrl+N',
                click: (menuItem, browserWindow, event) => {
                    browserWindow.webContents.send('execute-create-file')
                }
            },
            {
                label: '保存',
                accelerator: 'Ctrl+S',
                click: (menuItem, browserWindow, event) => {
                    browserWindow.webContents.send('execute-save-file')
                }
            },
            {
                label: '搜索', 
                accelerator: 'Ctrl+F',
                click: (menuItem, browserWindow, event) => {
                    browserWindow.webContents.send('execute-search-file')
                }
            },
            {
                label: '导入',
                accelerator: 'Ctrl+I',
                click: (menuItem, browserWindow, event) => {
                    browserWindow.webContents.send('execute-import-file')
                }
            },
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                accelerator: 'Ctrl+Z',
                role: 'undo'
            },
            {
                label: '重做',
                accelerator: 'Ctrl+Y',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: '剪切',
                accelerator: 'Ctrl+X',
                role: 'cut'
            },
            {
                label: '复制',
                accelerator: 'Ctrl+C',
                role: 'copy'
            },
            {
                label: '粘贴',
                accelerator: 'Ctrl+V',
                role: 'paste'
            },
            {
                label: '删除',
                accelerator: 'Delete',
                role: 'delete'
            },
            {
                label: '全选',
                accelerator: 'Ctrl+A',
                role: 'selectAll'
            },
        ]
    },
    {
        label: '视图',
        submenu: [
            {
                label: '刷新',
                accelerator: 'Ctrl+R',
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.reload()
                    }
                }
            },
            {
                label: '切换全屏',
                accelerator: 'F11',
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                    }
                } 
            },
            {  
                label: '切换开发者工具',
                accelerator: (() => {
                    if (process.platform === 'darwin') {    
                        return 'Alt+Command+I'
                    } else {
                        return 'Ctrl+Shift+I'
                    }
                })(),
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.webContents.toggleDevTools()
                    }
                }
            },
        ]
    },
    {
        label: '窗口',
        role: 'window',
        submenu: [
            {
                label: '最小化',
                accelerator: 'Ctrl+M',
                role: 'minimize'
            },
            {
                label: '关闭',
                accelerator: 'Ctrl+W',
                role: 'close'
            },
            {
                label: '切换全屏',
                role: 'togglefullscreen'
            },
        ]
    },
    {
        label: '帮助',
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: async () => {
                    await shell.openExternal('https://github.com/zhongjie-chen/electron-md')
                }
            },
        ]
    }   
];

module.exports = temp;
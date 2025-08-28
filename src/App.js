import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    // 通过预加载脚本获取平台信息
    if (window.electronAPI) {
      setPlatform(window.electronAPI.getPlatform());
    }
  }, []);

  const showMessage = async () => {
    alert('Electron 工作正常!');
    
    // 通过预加载脚本显示对话框
    if (window.electronAPI) {
      try {
        await window.electronAPI.showMessageBox({
          type: 'info',
          title: 'Electron 对话框',
          message: '这是一个来自 Electron 的原生对话框!',
          buttons: ['确定']
        });
      } catch (error) {
        console.error('无法显示对话框:', error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Electron + React!</h1>
        <p>欢迎使用你的第一个 Electron React 应用程序</p>
        {platform && <p>运行在: {platform}</p>}
        <button onClick={showMessage}>点击测试</button>
      </header>
    </div>
  );
}

export default App;
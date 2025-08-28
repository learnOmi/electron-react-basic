import React from 'react';
import './styles.css';

const App = () => {
  return (
    <div className="app">
      <h1>Hello Electron + React!</h1>
      <p>欢迎使用你的第一个Electron React应用程序</p>
      <button onClick={() => alert('Electron工作正常!')}>点击测试</button>
    </div>
  );
};

export default App;
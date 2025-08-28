const fs = require('fs');
const path = require('path');

// 解决生产环境静态资源路径问题
const buildPath = path.join(__dirname, '..', 'build');
const indexHtmlPath = path.join(buildPath, 'index.html');

if (fs.existsSync(indexHtmlPath)) {
  let content = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // 替换静态资源路径为相对路径
  content = content.replace(/(href|src)="\/([^"]*)"/g, '$1="./$2"');
  
  fs.writeFileSync(indexHtmlPath, content, 'utf8');
  console.log('Fixed static resource paths for Electron');
}
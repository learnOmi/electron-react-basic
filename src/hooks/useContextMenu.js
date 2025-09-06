import React, { useEffect, useRef } from 'react'

export default function useContextMenu(contextMenu, areaClass) {
  // Electron 的 IPC 通信使用结构化克隆算法，无法序列化函数，因此会报错; 必须进行处理
  // 处理菜单数据
  const serilizableItems = contextMenu.map(item => {
    const { click, ...rest } = item;
    return rest;
  })

  // 记录当前事件对象
  const curEle = useRef(null);

  useEffect(() => {
    const contextMenuHandler = async (e) => {
      
      const res = document.querySelector(`.${areaClass}`);
      if(res.contains(e.target)){
        curEle.current = e.target;
        e.preventDefault();
        window.electronAPI.openContextMenu(serilizableItems).then(result => {
          contextMenu.find(item => item.id === result)?.click();
        });
      }
    };

    document.addEventListener('contextmenu', contextMenuHandler);
    return () => {
      document.removeEventListener('contextmenu', contextMenuHandler);
    };
  });

  return curEle;
}

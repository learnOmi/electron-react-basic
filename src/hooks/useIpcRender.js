const { useEffect } = require("react");

export default function useIpcRender(actionMap) {
    useEffect(()=>{
        Object.keys(actionMap).forEach(key => {
            window.electronAPI.listenOn(key, actionMap[key]);
        });
        return () => {
            Object.keys(actionMap).forEach(key => {
                window.electronAPI.removeListen(key, actionMap[key]);
            });
        };
    });
}

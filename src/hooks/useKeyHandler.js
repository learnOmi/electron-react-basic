import { useEffect, useState, useCallback, useRef } from "react"

const useKeyHandler = (code) => {
    const [keyPressed, setKeyPressed] = useState(false);
    const lastKeyTimeRef = useRef(0);

    // 使用 useCallback 确保函数身份稳定
    const keyDownHandler = useCallback((event) => {
        if (event.keyCode === code) {
            const now = Date.now();
            // 添加时间阈值，防止快速连续触发
            if (now - lastKeyTimeRef.current > 100) {
                setKeyPressed(true);
                lastKeyTimeRef.current = now;
            }

        }
    }, [code]);

    const keyUpHandler = useCallback((event) => {
        if (event.keyCode === code) {
            setKeyPressed(false);
        }
    }, [code]);

    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        }
    }, [keyDownHandler, keyUpHandler]); // 依赖处理函数

    return keyPressed;
}

export default useKeyHandler;
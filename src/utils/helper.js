const Arr2Map = (arr) => {
    return arr.reduce((map, item) => {
        map[item.id] = item;
        return map;
    }, {});
}

const Map2Arr = (map) => {
    return Object.keys(map).map(id => map[id]);
}

// 渲染进程需要使用preload.js中暴露的api
const readFile = (path) => window.electronAPI.readFile(path);

const writeFile = (path, content) => window.electronAPI.writeFile(path, content);

const renameFile = (path, newPath) => window.electronAPI.renameFile(path, newPath);

const deleteFile = (path) => window.electronAPI.deleteFile(path);

const getDocumentsPath = async (dirname) => {
    const documentsPath = await window.electronAPI.getPath(dirname);
    return documentsPath;
};

const pathJoin = (...args) => window.electronAPI.pathJoin(...args);

const pathBasename = (filePath) => window.electronAPI.pathBasename(filePath);

const pathDirname = (filePath) => window.electronAPI.pathDirname(filePath);

const pathExtname = (filePath) => window.electronAPI.pathExtname(filePath);

export { Arr2Map, Map2Arr, readFile, writeFile, renameFile, deleteFile, getDocumentsPath, pathJoin, pathBasename, pathDirname, pathExtname };
import { Map2Arr } from "./helper";

const setFiles2store = (files) => {
    // 默认存储在 app.getPath('userData') 目录下，文件名为 'config.json'
    Map2Arr(files).reduce((obj, file)=>{
        const {title, path, createTime, id} = file;
        obj[id] = {id, title, path, createTime};
        return obj;
    },{});
    window.electronAPI.writeStore('files', files);
}

const getFilesFromStore = async () => {
    //console.log(await getDocumentsPath('userData'))
    return window.electronAPI.readStore('files');
}

const deleteFileFromStore = (id) => {
    getFilesFromStore().then((files)=>{
        delete files[id];
        setFiles2store(files);
    })
}

const clearFilesFromStore = () => {
    window.electronAPI.clearStore();
}

export  { setFiles2store, getFilesFromStore, deleteFileFromStore, clearFilesFromStore };
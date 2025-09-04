import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import './App.css';
import SearchFile from './components/SearchFile';
import FileList from './components/FileList';
import ButtonItem from './components/ButtonItem';
import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import TabList from './components/TabList';
import "easymde/dist/easymde.min.css";
import SimpleMdeReact from 'react-simplemde-editor';
import { v4 } from 'uuid';

const mockList = [
  { id: '1', title: 'file1', body: 'nihao', createTime: '132121' },
  { id: '2', title: 'file2', body: 'nihao2', createTime: '132121' }
]

// 使用 Styled Components 创建样式化组件
const LeftDiv = styled.div.attrs({
  className: 'col-3 left-panel'
})`
  position: relative;
  background-color: #7b8c7c;
  min-height: 100vh;
  .btn_list {
    left: 0;
    bottom: 0;
    width: 100%;
    position: absolute;
    display: flex;
    
    p {
      border: 0;
      width: 50%;
      color: #fff;
      border-radius: 0;
      margin-bottom: 0 !important;
    }
    
    p:nth-of-type(1) {
      background-color: #8ba39e;
    }
    
    p:nth-of-type(2) {
      background-color: #98b4b3;
    }
  }
`;

const RightDiv = styled.div.attrs({
  className: 'col-9 right-panel'
})`
  background-color: #c9d8cd;
  padding: 0;
  .init-page{
    color: #888;
    text-align: center;
    font: normal 28px/300px '微软雅黑'
  }
`;


function App() {
  const [files, setFiles] = useState(mockList);  //代表所有的文件信息
  const [activeId, setActiveId] = useState(''); // 当前正在编辑的文件id
  const [openIds, setOpenIds] = useState([]); // 当前打开的所有文件id
  const [unSaveIds, setUnSaveIds] = useState([]); // 当前未保存的所有文件id
  const [searchFiles, setSearchFiles] = useState([]); // 搜索文件信息

  // 应该显示的文件信息
  const fileList = (searchFiles.length > 0) ? searchFiles : files;
  // 已打开的所有文件信息
  const openFiles = files.filter(item => openIds.includes(item.id));
  // 正编辑的文件信息
  const activeFile = files.find(item => item.id === activeId);
  // 打开编辑页
  const openItem = (id) => {
    setActiveId(id);
    if (!openIds.includes(id)) setOpenIds([...openIds, id]);
  }
  // 更换Tab项
  const changeItem = (id) => {
    setActiveId(id);
  }
  // 关闭Tab项
  const closeFile = (id) => {
    const resIds = openIds.filter(i => i !== id)
    setOpenIds(resIds);
    if (resIds.length > 0 && activeId === id) {
      setActiveId(resIds[0]);
    }else if(resIds.length > 0 && activeId !== id){
      setActiveId(activeId);
    }else {
      setActiveId('');
    }
  }
  // 编辑文件
  const changeFile = (id, newValue) => {
    if (!unSaveIds.includes(id)) {
      setUnSaveIds([...unSaveIds, id]);
    }
    const newFiles = files.map(file => {
      if (file.id === id) {
        file.body = newValue;
      }
      return file;
    });
    setFiles(newFiles);
  }
  // 删除文件
  const deleteFile = (id) => {
    const newFiles = files.filter(file => file.id !== id);
    setFiles(newFiles);

    if (openIds.includes(id)) closeFile(id);
  }
  // 搜索文件
  const searchFile = (keyword) => {
    const newFiles = files.filter(file => file.title.includes(keyword));
    setSearchFiles(newFiles);
  }
  // 编辑文件名
  const reName = (id, value) => {
    const newFiles = files.map(file => {
      if (file.id === id) {
        file.title = value;
        file.isNew = false;
      }
      return file;
    });

    setFiles(newFiles);
  }
  // 新建文件信息
  const createFile = () => {
    // 检查是否已存在新建信息
    if (!files.find(file => file.isNew)) {
      const newId = v4();
      const newFile = {
        isNew: true,
        id: newId,
        title: '',
        body: '## 初始化内容',
        createTime: new Date().getTime()
      };

      setFiles([...files, newFile]);
    }
  } 

  return (
    <div className='App container-fulid px-0'>
      <div className='row no-gutters'>
        <LeftDiv>
          <SearchFile title={"我的文档"} onSearch={searchFile}></SearchFile>
          <FileList fileList={fileList} editFile={openItem} saveFile={(id, value) => { reName(id, value) }} deleteFile={deleteFile}></FileList>
          <div className='btn_list'>
            <ButtonItem title={'新建'} icon={faPlus} btnClick={createFile} />
            <ButtonItem title={'导入'} icon={faFileImport} />
          </div>
        </LeftDiv>
        <RightDiv>
          {
            activeFile &&
            <>
              <TabList files={openFiles} activeItem={activeId} unSaveItems={unSaveIds} clickItem={changeItem} closeItem={closeFile}></TabList>
              <SimpleMdeReact key={activeFile && activeFile.id} onChange={(value) => changeFile(activeFile.id, value)} value={activeFile.body} options={{ autofocus: true, spellChecker: false, minHeight: '500px' }} />
            </>
          }
          {
            !activeFile &&
            <div className='init-page'>新建或打开文件</div>
          }
        </RightDiv>
      </div>
    </div>
  );
}

export default App;
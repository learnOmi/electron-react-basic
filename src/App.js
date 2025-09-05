import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { Arr2Map, Map2Arr, getDocumentsPath, writeFile, pathJoin, renameFile, deleteFile as deleteLFile } from './utils/helper';

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
  const dispatch = useDispatch();
  const { files, activeId, openIds, unSaveIds, searchFiles, isNew, savePath } = useSelector((state) => state.file);

  // 初始化状态
  React.useEffect(() => {
    getDocumentsPath("documents").then(path => {
      dispatch({ type: 'SET_SAVE_PATH', payload: path });
    });
    dispatch({ type: 'SET_FILES', payload: Arr2Map(mockList) });
  }, [dispatch]);

  // 应该显示的文件信息
  const fileList = React.useMemo(() => {
    return (searchFiles.length > 0) && !isNew ? searchFiles : Map2Arr(files);
  }, [searchFiles, isNew, files]);
  // 已打开的所有文件信息
  const openFiles = React.useMemo(() => {
    return openIds.map(id => files[id]);
  }, [openIds, files]);
  // 正编辑的文件信息
  const activeFile = files[activeId];
  // 打开编辑页
  const openItem = (id) => {
    dispatch({ type: 'SET_ACTIVE_ID', payload: id });
    if (!openIds.includes(id)) dispatch({ type: 'SET_OPEN_IDS', payload: [...openIds, id] });
  }
  // 更换Tab项
  const changeItem = (id) => {
    dispatch({ type: 'SET_ACTIVE_ID', payload: id });
  }
  // 关闭Tab项
  const closeFile = (id) => {
    const resIds = openIds.filter(i => i !== id);
    dispatch({ type: 'SET_OPEN_IDS', payload: resIds });
    if (resIds.length > 0 && activeId === id) {
      dispatch({ type: 'SET_ACTIVE_ID', payload: resIds[0] });
    } else if (resIds.length > 0 && activeId !== id) {
      dispatch({ type: 'SET_ACTIVE_ID', payload: activeId });
    } else {
      dispatch({ type: 'SET_ACTIVE_ID', payload: '' });
    }
  }
  // 编辑文件
  const changeFile = (id, newValue) => {
    if (!unSaveIds.includes(id)) {
      dispatch({ type: 'SET_UNSAVE_IDS', payload: [...unSaveIds, id] });
    }
    const newFile = { ...files[id], body: newValue };
    dispatch({ type: 'SET_FILES', payload: { ...files, [id]: newFile } });
  }
  // 删除文件
  const deleteFile = async (id) => {
    const path = await pathJoin(savePath, `${files[id].title}.md`);
    deleteLFile(path).then(() => {
      const newFiles = { ...files };
      delete newFiles[id];
      dispatch({ type: 'SET_FILES', payload: newFiles });

      if (openIds.includes(id)) closeFile(id);
    });
  }
  // 搜索文件
  const searchFile = (keyword) => {
    if (keyword.trim() !== '') {
      // 只在关键词有实际内容时才进行搜索
      const filteredFiles = Map2Arr(files).filter(file =>
        file.title && file.title.includes(keyword)
      );

      // 只有当搜索结果不同时才更新状态
      if (JSON.stringify(filteredFiles) !== JSON.stringify(searchFiles)) {
        dispatch({ type: 'SET_SEARCH_FILES', payload: filteredFiles });
      }
    } else {
      dispatch({ type: 'SET_SEARCH_FILES', payload: [] });
    }
  }
  // 保存文件信息
  const saveData = async (id, value, isCreateNew = false) => {
    try {
      if (!value) return;
      // 避免文件名重复
      if (Map2Arr(files).find(file => file.title === value && file.id !== id)) {
        value += "_copy";
      }

      const newFile = { ...files[id], title: value, isNew: false };

      if (isCreateNew) {
        // 创建新文件
        const filePath = await pathJoin(savePath, `${value}.md`);
        await writeFile(filePath, newFile.body);
      } else {
        // 重命名现有文件
        const oldPath = await pathJoin(savePath, `${files[id].title}.md`);
        const newPath = await pathJoin(savePath, `${value}.md`);

        // 只有当文件名改变时才执行重命名
        if (oldPath !== newPath && newPath) {
          await renameFile(oldPath, newPath);
        }
      }

      // 统一更新状态
      dispatch({ type: 'SET_FILES', payload: { ...files, [id]: newFile } });

    } catch (error) {
      console.error('保存文件失败:', error);
      // 可以在这里添加错误处理逻辑，如显示错误提示
    }
  }
  // 新建文件信息
  const createFile = () => {
    // 检查是否已存在新建信息
    if (!isNew) {
      const newId = v4();
      const newFile = {
        isNew: true,
        id: newId,
        title: '',
        body: '## 初始化内容',
        createTime: new Date().getTime()
      };

      dispatch({ type: 'SET_IS_NEW', payload: true });
      dispatch({ type: 'SET_FILES', payload: { ...files, [newId]: newFile } });
    }
  }

  const clearState = (isDel) => {
    if (isNew && isDel) {
      const newFile = Map2Arr(files).find(file => file.isNew);
      if (newFile) deleteFile(newFile.id);
    }
    dispatch({ type: 'SET_IS_NEW', payload: false });
  }

  const saveCurrentFiles = async () => {
    const path = await pathJoin(savePath, `${activeFile.title}.md`);
    writeFile(path, activeFile.body).then(() => {
      dispatch({
        type: 'SET_UNSAVE_IDS',
        payload: unSaveIds.filter(id => id !== activeFile.id)
      });
    })
  }

  return (
    <div className='App container-fulid px-0'>
      <div className='row no-gutters'>
        <LeftDiv>
          <SearchFile title={"我的文档"} onSearch={searchFile} clearState={clearState}></SearchFile>
          <FileList fileList={fileList} editFile={openItem} saveFile={(id, value, isCreateNew) => { saveData(id, value, isCreateNew) }} deleteFile={deleteFile} clearState={clearState}></FileList>
          <div className='btn_list'>
            <ButtonItem title={'新建'} icon={faPlus} btnClick={createFile} />
            <ButtonItem title={'导入'} icon={faFileImport} />
          </div>
        </LeftDiv>
        <RightDiv>
          <button onClick={saveCurrentFiles}>保存</button>
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
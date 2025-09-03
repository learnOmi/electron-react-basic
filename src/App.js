import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import './App.css';
import SearchFile from './components/SearchFile';
import FileList from './components/FileList';
import ButtonItem from './components/ButtonItem';
import { faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';
import TabList from './components/TabList';

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
  padding: 0
`;


function App() {
  return (
    <div className='App container-fulid px-0'>
      <div className='row no-gutters'>
        <LeftDiv>
          <SearchFile title={"我的文档"} onSearch={(value) => { console.log(value) }}></SearchFile>
          <FileList fileList={mockList} editFile={(id) => { console.log(id) }} saveFile={(id, value) => { console.log(id, value) }} deleteFile={(id) => { console.log(id) }}></FileList>
          <div className='btn_list'>
            <ButtonItem title={'新建'} icon={faPlus} />
            <ButtonItem title={'导入'} icon={faFileImport} />
          </div>
        </LeftDiv>
        <RightDiv>
          <TabList files={mockList} activeItem='1' unSaveItems={['1']} clickItem={(id)=>{console.log(id)}} closeItem={(id)=>{console.log(id)}}></TabList>
        </RightDiv>
      </div>
    </div>
  );
}

export default App;
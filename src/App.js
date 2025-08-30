import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import './App.css';
import SearchFile from './components/SearchFile';
import FileList from './components/FileList';

const mockList = [
  { id: '1', title: 'file1', body: 'nihao', createTime: '132121' }
]

// 使用 Styled Components 创建样式化组件
const LeftDiv = styled.div.attrs({
  className: 'col-3 left-panel'
})`
  background-color: #7b8c7c;
  min-height: 100vh;
`;

const RightDiv = styled.div.attrs({
  className: 'col-9 right-panel'
})`
  background-color: #c9d8cd;
`;


function App() {
  return (
    <div className='App container-fulid px-0'>
      <div className='row no-gutters'>
        <LeftDiv>
          <SearchFile title={"我的文档"} onSearch={(value) => { console.log(value) }}></SearchFile>
          <FileList fileList={mockList} editFile={(id) => { console.log(id) }} saveFile={(id, value) => { console.log(id, value) }} deleteFile={(id) => { console.log(id) }}></FileList>
        </LeftDiv>
        <RightDiv>右侧</RightDiv>
      </div>
    </div>
  );
}

export default App;
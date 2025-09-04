import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faEdit, faTrashAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import { z } from 'zod';
import useKeyHandler from '../hooks/useKeyHandler';

const GroupUI = styled.ul.attrs({
    className: 'list-group list-group-flush'
})`
    li{
        color: #fff;
        background: none;
    }
`;

const FileListSchema = z.object({
    fileList: z.array(z.any()),
    editFile: z.function(),
    saveFile: z.function(),
    deleteFile: z.function(),
});

export default function FileList(props) {
    const { fileList, editFile, saveFile, deleteFile } = FileListSchema.parse(props);
    const [editItem, setEditItem] = useState(false);
    const [value, setValue] = useState('');
    const enterKeyPressed = useKeyHandler(13);
    const escKeyPressed = useKeyHandler(27);
    const closeFn = () => {
        setEditItem(false);
        setValue('');

        const currentFile = fileList.find(file => file.id === editItem);
        if (currentFile && currentFile.isNew) {
            deleteFile(editItem);
        }
    }

    // 在keydown重新渲染后，closeFn中setEditItem(false)就能够阻止多次执行saveFile
    // if (enterKeyPressed && editItem && value.trim() !== '') {
    //     saveFile(editItem, value);
    //     closeFn();
    // }
    // if (escKeyPressed && editItem) {
    //     closeFn();
    // }

    // 使用 useEffect 处理按键事件; 不然会导致  
    // Cannot update a component (`App`) while rendering a different component (`FileList`)
    useEffect(() => {
        if (enterKeyPressed && editItem) {
            saveFile(editItem, value);
            closeFn(false);
        }
        if (escKeyPressed && editItem) {
            closeFn(true);
        }
    });
    
    useEffect(() => {
        // 只在没有正在编辑的项目时处理新建文件
        if (!editItem) {
            const newFiles = fileList.filter(file => file.isNew);
            if (newFiles.length > 0) {
                const newFile = newFiles[0];
                setEditItem(newFile.id);
                setValue(newFile.title || '');
            }
        }
    }, [fileList, editItem]);

    useEffect(() => {
        // 点击编辑时检查删除新建的文件信息
        const newFile = fileList.find(file => file.isNew);
        if(newFile && newFile.id !== editItem){
            deleteFile(newFile.id);
        }
    });

    return (
        <GroupUI>
            {
                fileList.map(item => {
                    if (item.id === editItem || (item.isNew && editItem === false)) {
                        return (
                            <li key={item.id} className='list-group-item d-flex align-items-center'>
                                <input className='col-9' value={value} onChange={(e) => { setValue(e.target.value) }} />
                                <span className='col-3' onClick={closeFn}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></span>
                            </li>
                        )
                    } else {
                        return (
                            <li key={item.id} className='list-group-item d-flex align-items-center'>
                                <span className='mr-2'><FontAwesomeIcon icon={faFileAlt}></FontAwesomeIcon></span>
                                <span className='col-8' onClick={() => { editFile(item.id); closeFn() }}>{item.title}</span>
                                <span className='col-2' onClick={() => { setEditItem(item.id) }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></span>
                                <span className='col-2' onClick={() => { deleteFile(item.id) }}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></span>
                            </li>
                        )
                    }
                })
            }
        </GroupUI>
    )
}

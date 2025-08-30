import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faEdit, faTrashAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import { z } from 'zod';

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
    const closeFn = () => {
        setEditItem(false);
        setValue('');
    }

    useEffect(() => {
        const searchHandler = (key) => {
            const { keyCode } = key;
            if (keyCode === 13 && editItem) {
                saveFile(editItem, value);
                closeFn();
            }
            if (keyCode === 27 && editItem) {
                closeFn();
            }
        }
        document.addEventListener('keyup', searchHandler);

        return () => {
            document.removeEventListener('keyup', searchHandler);
        }
    });

    return (
        <GroupUI>
            {
                fileList.map(item => {
                    if (item.id !== editItem) {
                        return (
                            <li key={item.id} className='list-group-item d-flex align-items-center'>
                                <span className='mr-2'><FontAwesomeIcon icon={faFileAlt}></FontAwesomeIcon></span>
                                <span className='col-8' onClick={() => { editFile(item.id) }}>{item.title}</span>
                                <span className='col-2' onClick={() => { setEditItem(item.id) }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></span>
                                <span className='col-2' onClick={() => { deleteFile(item.id) }}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></span>
                            </li>
                        )
                    } else {
                        return (
                            <li key={item.id} className='list-group-item d-flex align-items-center'>
                                <input className='col-9' value={value} onChange={(e) => { setValue(e.target.value) }} />
                                <span className='col-3' onClick={closeFn}><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></span>
                            </li>
                        )
                    }
                })
            }
        </GroupUI>
    )
}

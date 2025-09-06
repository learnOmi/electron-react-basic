import React, { Fragment, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { z } from 'zod';
import useKeyHandler from '../hooks/useKeyHandler';
import useIpcRender from '../hooks/useIpcRender';

const SearchFilePropsSchema = z.object({
    title: z.string().default('文档'),
    onSearch: z.function(),
    clearState: z.function()
});

const Searchdiv = styled.div.attrs({
    className: "d-flex align-items-center justify-content-between"
})`
    border-bottom: 1px solid #fff;
    span{
        color:#fff;
        padding: 0 10px;
        font: normal 16px/40px '微软雅黑'
    };
    input{
        border: none;
        border: radius 4px;
        margin-left: 10px;
    }
`

export default function SearchFile(props) {
    const [searchActive, setSearchActive] = useState(false);
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    const enterKeyPressed = useKeyHandler(13);
    const escKeyPressed = useKeyHandler(27);

    // 验证 props
    const { title, onSearch, clearState } = SearchFilePropsSchema.parse(props);

    const closeSearch = () => {
        setSearchActive(false);
        setValue('');

        // 重置搜索关键字
        onSearch('');
        // 确保清除状态
        clearState(false);
    };

    const openSearch = () => {
        setSearchActive(true);
        clearState(true);
    }

    // 由于改变state后的每次重新渲染都会执行函数，会导致添加多个listener，导致多次执行
    // if (enterKeyPressed && searchActive) {
    //     onSearch(value);
    // }
    useEffect(() => {
        if (enterKeyPressed && searchActive) {
            onSearch(value);
        }
        if (escKeyPressed && searchActive) {
            closeSearch();
        }
    });

    // if (escKeyPressed && searchActive) {
    //     closeSearch();
    // }

    useEffect(() => {
        if (searchActive) {
            inputRef.current.focus();
        }
    });

    useIpcRender(
        {'execute-search-file': openSearch}
    );

    return (
        <Fragment>
            {
                !searchActive &&
                <>
                    <Searchdiv>
                        <span>{title}</span>
                        <span onClick={openSearch}>
                            <FontAwesomeIcon icon={faSearch} color="#fff" />
                        </span>
                    </Searchdiv>
                </>
            }
            {
                searchActive &&
                <>
                    <Searchdiv>
                        <input ref={inputRef} value={value} onChange={(e) => { setValue(e.target.value) }} />
                        <span onClick={closeSearch}>
                            <FontAwesomeIcon icon={faTimes} color="#fff" />
                        </span>
                    </Searchdiv>
                </>
            }
        </Fragment>
    )
}

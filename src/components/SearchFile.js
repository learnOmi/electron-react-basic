import React, { Fragment, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { z } from 'zod';

const SearchFilePropsSchema = z.object({
    title: z.string().default('文档'),
    onSearch: z.function()
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

    // 验证 props
    const { title, onSearch } = SearchFilePropsSchema.parse(props);

    const closeSearch = () => {
        setSearchActive(false);
        setValue('');
    };

    useEffect(() => {
        const searchHandler = (key) => {
            const { keyCode } = key;
            if (keyCode === 13 && searchActive) {
                onSearch(value);
            }
            if (keyCode === 27 && searchActive) {
                closeSearch();
            }
        }
        document.addEventListener('keyup', searchHandler);

        return () => {
            document.removeEventListener('keyup', searchHandler);
        }
    });

    useEffect(() => {
        if (searchActive) {
            inputRef.current.focus();
        }
    });

    return (
        <Fragment>
            {
                !searchActive &&
                <>
                    <Searchdiv>
                        <span>{title}</span>
                        <span onClick={() => setSearchActive(true)}>
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

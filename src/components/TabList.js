import React from 'react'
import styled from 'styled-components';
import z from 'zod'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

let TabUl = styled.ul.attrs({
    className: 'nav nav-pills'
})`
  border-bottom: 1px solid #fff;
  li a{
    border-radius: 0px!important;
    color: #fff;
  }
  li a.active{
    background-color: #3e403f!important;
  }
  .nav-link.unSaveMark .rounded-circle{
    width: 11px;
    height: 11px;
    display: inline-block;
    background-color: #b80233;
  }
  .nav-link.unSaveMark:hover .rounded-circle{
    display: none;
  }
  .nav-link.unSaveMark .icon-close{
    display: none;
  }
  .nav-link.unSaveMark:hover .icon-close{
    display: inline-block;
  }

`;

const TabListSchema = z.object({
    files: z.array(z.any()),
    activeItem: z.string(),
    unSaveItems: z.array(z.any()).default([]),
    clickItem: z.function(),
    closeItem: z.function()
});

export default function TabList(props) {
    const { files, activeItem, unSaveItems, clickItem, closeItem } = TabListSchema.parse(props);

    return (
        <TabUl>
            {
                files.map(item => {
                    let unSaveMark = unSaveItems.includes(item.id);

                    let finalClass = classNames({
                        "nav-link": true,
                        "active": activeItem === item.id,
                        "unSaveMark": unSaveMark
                    });
                    return (
                        <li className='nav-item' key={item.id}>
                            <a href='#;' className={finalClass} onClick={(e) => { e.preventDefault(); clickItem(item.id) }}>
                                {item.title}
                                <span className='ml-2 icon-close' onClick={(e) => { e.stopPropagation(); closeItem(item.id); }}>
                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                </span>
                                {unSaveMark && <span className='ml-2 rounded-circle'></span>}
                            </a>
                        </li>
                    )
                })
            }
        </TabUl>
    )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'


const BtnP = styled.p.attrs({
    className: 'btn'
})``

export default function ButtonItem({icon, title, btnClick}) {
  return (
    <BtnP onClick={btnClick}>
        <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        <span className="ml-2">{title}</span>
    </BtnP>
  )
}

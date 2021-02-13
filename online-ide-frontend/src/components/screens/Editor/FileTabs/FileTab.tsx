import React from 'react'
import styled from 'styled-components'
import { GoPrimitiveDot } from 'react-icons/go'

import LanguageIcon from '../LanguageIcon'

interface TabWrapperProps {
  active?: boolean,
  onClick?: Function
}

const TabWrapper = styled.li<TabWrapperProps>`
  display: flex;
  align-items: center;
  padding: 12px;
  min-width: 100px;
  background-color: ${({ active = false, theme }) => active ? theme.darkBackground : 'transparent'};
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: .8;
  }
`

const FileName = styled.span`
  margin-left: 8px;
`

interface TabProps {
  fileName: string,
  active?: boolean,
  wasModified?: boolean
}

function FileTab ({ fileName, active, wasModified = false }: TabProps) {
  return (
    <TabWrapper active={active}>
      <LanguageIcon name={fileName} />
      <FileName>
        {fileName}
      </FileName>
      {wasModified && <GoPrimitiveDot />}
    </TabWrapper>
  )
}

export default FileTab

import React from 'react'
import styled from 'styled-components'
import { Link, useRouteMatch } from 'react-router-dom'

import FullSizeContainer from '../../shared/FullSizeContainer'

const Menu = styled.ul`
  padding: 0;
  padding-top: 8px;
  margin: 0;
  list-style: none;
`

const MenuItem = styled(Link)`
  display: block;
  padding: 8px 16px;
  color: ${(props) => props.theme.mainFontColor};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, .1);
  }
`

function Drawer () {
  const { url } = useRouteMatch()

  return (
    <FullSizeContainer>
      <Menu>
        <MenuItem to={`${url}/projects`}>
          My projects
        </MenuItem>

        <MenuItem to="/logout">
          Log out
        </MenuItem>
      </Menu>
    </FullSizeContainer>
  )
}

export default Drawer

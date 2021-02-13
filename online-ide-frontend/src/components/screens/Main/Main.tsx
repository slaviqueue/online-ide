import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import FullSizeContainer from '../../shared/FullSizeContainer'
import borderDivider from '../../../styles/mixins/borderDivider'
import Drawer from './Drawer'
import Header from '../../shared/Header'
import Logo from '../../shared/Logo'
import Projects from './Projects/Projects'
import Avatar from '../../shared/Avatar'
import User from '../../../models/Common/User'

const Container = styled(FullSizeContainer)`
  display: flex;
  flex-direction: column;
`

const DrawerContainer = styled.div`
  width: 300px;
  height: 100%;
  ${borderDivider('right')}
`

const MainContainer = styled(FullSizeContainer)`
  display: flex;
  flex-direction: row;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Main = observer(function () {
  return (
    <Container>
      <Header>
        <HeaderContainer>
          <Logo />
          <Avatar src={User.user?.avatarUrl} />
        </HeaderContainer>
      </Header>

      <MainContainer>
        <DrawerContainer>
          <Drawer />
        </DrawerContainer>

        <Route path="/app/projects" component={Projects} />
      </MainContainer>
    </Container>
  )
})

export default Main

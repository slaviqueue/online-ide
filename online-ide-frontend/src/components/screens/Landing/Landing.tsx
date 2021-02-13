import React from 'react'
import styled from 'styled-components'
import { DiNodejsSmall, DiPython, DiRuby, DiJava } from 'react-icons/di'
import TextLoop from 'react-text-loop'

import Margin from '../../shared/Margin'
import Button from '../../shared/Button'
import Header from './Header'
import { GithubRedirectUri, GithubClientId } from '../../../config'

const Container = styled.div`
  width: 100%;
  height: 100%;

  overflow: hidden;

  * {
    letter-spacing: 1px;
  }
`

const Shout = styled.span`
  text-transform: uppercase;
  font-size: 72px;
  font-weight: bold;
`

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`

const Description = styled.span`
  color: #D3D3D3;
  font-size: 18px;
  max-width: 600px;
`

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Content = styled.div`
  margin-top: -128px;
  max-width: 850px;
`

const LanguageIconsContainer = styled.div`
  display: flex;
  justify-content: center;
`

const LanguageIcons = styled.div`
  max-width: 600px;
  display: flex;
  justify-content: space-around;

  & > *:not(:first-child) {
    margin-left: 32px;
  }
`

function Landing () {
  return (
    <Container>
      <Header />
      <ContentContainer>
        <Content>
          <Shout>
            PROTOTYPE AND SHARE YOUR IDEAS{' '}
            <TextLoop>
              <span>quickly</span>
              <span>free</span>
              <span>with fun</span>
              <span>please</span>
            </TextLoop>
          </Shout>

          <Margin bottom={32} />

          <DescriptionContainer>
            <Description>
            WCS is a powerful IDE which supports most of popular languages, such like Javascript, Typescript, Go, Python, C#, Java and more.
            </Description>
          </DescriptionContainer>

          <Margin bottom={32} />

          <LanguageIconsContainer>
            <LanguageIcons>
              <DiNodejsSmall size={48} />
              <DiPython size={48} />
              <DiRuby size={48} />
              <DiJava size={48} />
            </LanguageIcons>
          </LanguageIconsContainer>

          <Margin bottom={64} />

          <Button
            as="a"
            href={`https://github.com/login/oauth/authorize?scope=user&client_id=${GithubClientId}&redirect_uri=${GithubRedirectUri}`}
          >
            start with github
          </Button>
        </Content>
      </ContentContainer>
    </Container>
  )
}

export default Landing

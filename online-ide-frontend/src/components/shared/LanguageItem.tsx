import React from 'react'
import styled from 'styled-components'
import LanguageIcon from '../screens/Editor/LanguageIcon'
import FullSizeContainer from './FullSizeContainer'
import Margin from './Margin'
import Typography from './Typography'

interface LanguageItemProps {
  title: string
  extension: string
}

const Container = styled(FullSizeContainer)`
  display: flex;
  align-items: center;
`

function LanguageItem (props: LanguageItemProps) {
  return (
    <Container>
      <LanguageIcon name={props.extension} />
      <Margin right={8} />
      <Typography capitalize>{props.title}</Typography>
    </Container>
  )
}

export default LanguageItem

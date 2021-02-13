import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

import Typography from './Typography'

interface LabelWrapperProps {
  label: string
}

const Label = styled(Typography)`
  display: block;
  margin-bottom: 8px;
  text-transform: capitalize;
`

export default function LabelWrapper ({ label, children }: PropsWithChildren<LabelWrapperProps>) {
  return (
    <React.Fragment>
      <Label weight='bolder'>
        {label}
      </Label>
      {children}
    </React.Fragment>
  )
}

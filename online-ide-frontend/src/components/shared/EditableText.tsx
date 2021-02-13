import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MdEdit } from 'react-icons/md'

import Typography from './Typography'
import TextInputElement from './TextInput'
import ButtonWrapper from './ButtonrWapper'
import Margin from './Margin'

interface EditableFieldProps {
  label?: string
  value?: string
  onChange?: (v?: string) => void
}

const Label = styled(Typography)`
  letter-spacing: .5px;
`

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const EditIcon = styled(MdEdit)`
  color: ${(props) => props.theme.mainFontColor};
`

function EditableField ({ label, value, onChange }: EditableFieldProps) {
  const [currentValue, setCurrentValue] = useState(value)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  function toggleEditing () {
    if (isEditing) {
      onChange?.(currentValue)
    }

    setIsEditing(!isEditing)
  }

  return (
    <>
      <Label size='regular' weight='bold'>{label}</Label>
      <Margin bottom={4} />
      <TextContainer>
        {!isEditing && <Typography>{currentValue}</Typography>}
        {isEditing && <TextInputElement fullWidth value={currentValue} onChange={({ target: { value } }) => setCurrentValue(value)} />}

        <Margin right={16} />

        <ButtonWrapper onClick={toggleEditing}>
          <EditIcon size={18} />
        </ButtonWrapper>
      </TextContainer>
    </>
  )
}

export default EditableField

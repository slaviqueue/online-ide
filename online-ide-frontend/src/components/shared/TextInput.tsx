import styled from 'styled-components'
import baseFormElement from '../../styles/mixins/baseFormElement'
import withFullWidthProp from '../../styles/mixins/widthFullWidthProp'

interface TextInputProps {
  fullWidth?: boolean
}

const TextInputElement = styled.input<TextInputProps>`
  ${baseFormElement}
  ${withFullWidthProp}
`

export default TextInputElement

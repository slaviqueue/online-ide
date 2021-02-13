import styled from 'styled-components'

type ButtonType = 'regular' | 'error'

interface ButtonProps {
  buttonType?: ButtonType
  withIconInside?: boolean
}

function getBackgroundColor (props: any): string {
  if (props.disabled) {
    return props.theme.disabledControlBackgroundColor
  }

  switch (props.buttonType as ButtonType) {
    case 'regular': return props.theme.buttonBackground
    case 'error': return props.theme.errorButtonBackground

    default: return props.theme.buttonBackground
  }
}

function getColor (props: any): string {
  if (props.disabled) {
    return props.theme.disabledControlColor
  }

  return props.theme.buttonFontColor
}

function getPadding (props: ButtonProps): string {
  if (props.withIconInside) {
    return '4px'
  }

  return '8px 16px'
}

const Button = styled.button<ButtonProps>`
  text-transform: uppercase;
  color: ${getColor};
  background-color: ${getBackgroundColor};
  font-family: Roboto;
  padding: ${getPadding};
  box-shadow: 1px 1px 12px 0px rgba(0, 0, 0, .3);
  border: none;
  border-radius: 4px;
  letter-spacing: .7px;
  text-decoration: none;

  transition: opacity .1s ease-in-out;

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      opacity: .8;
    }
  }
`

export default Button

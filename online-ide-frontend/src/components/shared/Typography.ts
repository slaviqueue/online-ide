import styled from 'styled-components'

type TypographySize = 'small' | 'regular' | 'medium' | 'big'
type TypographyWeight = 'regular' | 'bolder' | 'bold'

const TypographySizeToSize: Record<TypographySize, number> = {
  small: 12,
  regular: 14,
  medium: 18,
  big: 24
}

const TypographyWeightToWeight: Record<TypographyWeight, number> = {
  regular: 400,
  bolder: 500,
  bold: 600
}

interface TypographyProps {
  size?: TypographySize
  weight?: TypographyWeight
  uppercase?: boolean
  capitalize?: boolean
}

const Typography = styled.span<TypographyProps>`
  font-size: ${(props) => TypographySizeToSize[props.size || 'small']}px;
  font-weight: ${(props) => TypographyWeightToWeight[props.weight || 'regular']};
  ${(props) => props.uppercase && 'text-transform: uppercase;'}
  ${(props) => props.capitalize && 'text-transform: capitalize;'}
`

export default Typography

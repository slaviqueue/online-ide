type Direction = 'top' | 'right' | 'bottom' | 'left'

function borderDivider (direction: Direction) {
  return (props: any) => `border-${direction}: 1px solid ${props.theme.darkBorderColor};`
}

export default borderDivider

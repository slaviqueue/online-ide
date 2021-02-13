import React, { PropsWithChildren } from 'react'

interface MarginProps {
  top?: number,
  right?: number,
  bottom?: number,
  left?: number,
}

function Margin ({ top, right, bottom, left, children }: PropsWithChildren<MarginProps>) {
  const style = {
    ...(top && { marginTop: top }),
    ...(left && { marginLeft: left }),
    ...(bottom && { marginBottom: bottom }),
    ...(right && { marginRight: right })
  }

  return <div style={style}>{children}</div>
}

export default Margin

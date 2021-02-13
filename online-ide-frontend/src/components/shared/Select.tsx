/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import ReactSelect, { Props } from 'react-select'

const Container = styled.div`
  & {
    .Select__control {
      border-color: ${(props) => props.theme.darkBorderColor};
      background-color: transparent;

      .Select__single-value {
        color: ${(props) => props.theme.mainFontColor};
      }
    }

    .Select__menu {
      background-color: ${(props) => props.theme.midDarkBackground};
      overflow: hidden;

      .Select__menu-list {
        .Select__option {
          background-color: transparent;

          &.Select__option--is-selected {
            background-color: transparent;
          }

          &.Select__option--is-focused {
            background-color: rgba(0, 0, 0, .15);
          }
        }
      }
    }
  }
`

const Select = forwardRef(function (props: Props, ref: any) {
  return (
    <Container>
      <ReactSelect {...props} classNamePrefix='Select' ref={ref} />
    </Container>
  )
})

export default Select

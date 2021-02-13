const customScrollMixin = `
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #1d1f21;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #191919;
    border-radius: 20px;
    border: 3px solid #1d1f21;
  }

  ::-webkit-scrollbar-corner {
    border-color: #1d1f21;
  }
`

export default customScrollMixin

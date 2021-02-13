function baseFormElement (props: any) {
  return `
    background-color: transparent;
    padding: 8px 12px;
    border-radius: 3px;
    border: 1px solid ${props.theme.darkBorderColor};
    color: ${props.theme.mainFontColor};
  `
}

export default baseFormElement

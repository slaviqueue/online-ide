import React, { useState, useEffect } from 'react'
import { last, startsWith } from 'lodash'
import styled from 'styled-components'

import languages from '../../../resources/language-icons.json'

const ExtensionToName = languages as Record<string, string>

function getExtension (name: string) {
  if (startsWith(name, '.')) {
    return name
  }

  return last(name.split('.'))
}

const Icon = styled.img`
  width: 16px;
  height: 16px;
`

const baseIconUrl = 'https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons'
const defaultFileIconSrc = `${baseIconUrl}/default_file.svg`

function getLanguageIcon (languageName: string) {
  return `${baseIconUrl}/file_type_${languageName.toLowerCase()}.svg`
}

function LanguageIcon ({ name }: { name: string }) {
  const extension: string = getExtension(name) || ''
  const languageName = ExtensionToName[extension] || ''
  const [imageSrc, setImageSrc] = useState(getLanguageIcon(languageName))

  function handleLoadingError () {
    if (imageSrc !== defaultFileIconSrc) {
      setImageSrc(defaultFileIconSrc)
    }
  }

  useEffect(() => {
    setImageSrc(getLanguageIcon(languageName))
  }, [name])

  return (
    <Icon
      src={imageSrc}
      onError={handleLoadingError}
    />
  )
}

export default LanguageIcon

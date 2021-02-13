import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { last } from 'lodash'

import TextInputElement from '../../../shared/TextInput'
import FullSizeContainer from '../../../shared/FullSizeContainer'
import Typography from '../../../shared/Typography'
import Margin from '../../../shared/Margin'
import SearchResultsList from './SearchResultsList'
import SearchModel from '../../../../models/Editor/Search'
import customScrollMixin from '../../../../styles/mixins/customScroll'
import CodeEditor from '../../../../models/Editor/CodeEditor'

const Container = styled(FullSizeContainer)`
  overflow-x: hidden;
  ${customScrollMixin}
`

const EnterKeyCode = 13

const Search = observer(function () {
  function handleSearchInputKeyUp ({ keyCode }: any) {
    if (keyCode === EnterKeyCode) {
      SearchModel.search()
    }
  }

  function handleSearchQueryChange ({ target: { value } }: any) {
    SearchModel.setSearchQuery(value)
  }

  function handleSelectFile (path: string) {
    const parts = path.split('/')
    parts.shift()

    const name = last(parts)
    parts.pop()

    CodeEditor.openFile(parts, name as string)
  }

  return (
    <Container withPadding>
      <Typography size='regular' weight='bolder' uppercase>
        Search
      </Typography>

      <Margin top={16} />

      <TextInputElement
        autoFocus
        fullWidth
        placeholder="Type search query here"
        onKeyUp={handleSearchInputKeyUp}
        onChange={handleSearchQueryChange}
        value={SearchModel.query}
      />

      <Margin top={16} />

      <SearchResultsList
        query={SearchModel.query}
        results={SearchModel.searchResults}
        onSelectFile={handleSelectFile}
      />
    </Container>
  )
})

export default Search

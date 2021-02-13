import React from 'react'
import styled from 'styled-components'
import Highlighter from 'react-highlight-words'

import LanguageIcon from '../LanguageIcon'
import Typography from '../../../shared/Typography'
import ItemContainer from '../../../shared/ItemContainer'
import Margin from '../../../shared/Margin'

type SearchResults = Record<string, string[]>

interface SearchResultsListProps {
  query: string
  results: SearchResults
  onSelectFile?: (path: string) => void
}

const Filename = styled(Typography)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const ResultItemContainer = styled(ItemContainer)`
  padding-left: 0;
  padding-right: 0;
`

const Lines = styled.ul`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  padding-left: 16px;
  list-style: none;
`

const Line = styled.li`
  padding: 4px 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, .2);
  }
`

function SearchResultsList ({ query, results, onSelectFile = () => {} }: SearchResultsListProps) {
  return (
    <div>
      {Object.entries(results).map(([fileName, lines]) => (
        <React.Fragment key={fileName}>
          <ResultItemContainer onClick={() => onSelectFile(fileName)}>
            <Margin right={8}>
              <LanguageIcon name={fileName} />
            </Margin>
            <Filename weight="bolder" title={fileName}>{fileName}</Filename>
          </ResultItemContainer>

          <Lines>
            {lines.map((line, i) => (
              <Line key={i} onClick={() => onSelectFile(fileName)}>
                <Highlighter
                  searchWords={[query]}
                  autoEscape={true}
                  textToHighlight={line}
                />
              </Line>
            ))}
          </Lines>
        </React.Fragment>
      ))}
    </div>
  )
}

export default SearchResultsList

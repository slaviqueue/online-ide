import React from 'react'

import useToolbarState from '../Toolbar/useToolbarState'
import FileTree from '../FileTree/FileTree'
import Settings from '../Settings/Settings'
import Search from '../Search/Search'
import Receipts from '../Receipts/Receipts'

function Drawer () {
  const [currentToolbarState] = useToolbarState()

  return (
    <React.Fragment>
      {currentToolbarState === 'FileTree' && <FileTree />}
      {currentToolbarState === 'Settings' && <Settings />}
      {currentToolbarState === 'Search' && <Search />}
      {currentToolbarState === 'Receipts' && <Receipts />}
    </React.Fragment>
  )
}

export default Drawer

import { useLocation, useHistory } from 'react-router-dom'
import { ToolbarState } from './ToolbarState'

const DefaultToolbarState: ToolbarState = 'FileTree'

function useToolbarState (): [ToolbarState, (state: ToolbarState) => void] {
  const history = useHistory()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const currentToolbarState = params.get('currentToolbarState') || DefaultToolbarState

  function setToolbarState (toolbarState: string) {
    history.replace(`${location.pathname}?currentToolbarState=${toolbarState}`)
  }

  return [currentToolbarState as ToolbarState, setToolbarState]
}

export default useToolbarState

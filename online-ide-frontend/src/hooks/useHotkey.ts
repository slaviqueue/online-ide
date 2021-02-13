import { useEffect, useRef } from 'react'

type Callback = () => void

type Keydowns = Record<string, string>

function useHotkey (hotkey: string, callback: Callback) {
  const keydowns = useRef<Keydowns>({})
  const keys = hotkey.split('+')

  function handleKeydown (e: KeyboardEvent) {
    const key = e.key.toLowerCase()
    keydowns.current[e.key.toLowerCase()] = key

    const isSpecialKeyPressed = e.ctrlKey || e.shiftKey
    const isOneOfHotKeys = keys.includes(e.key)

    if (isSpecialKeyPressed && isOneOfHotKeys) {
      e.preventDefault()
    }
  }

  function handleKeyup () {
    const allKeysSatisfied = keys.every((key) => keydowns.current[key.toLowerCase()])

    if (allKeysSatisfied) {
      callback()
    }

    keydowns.current = {}
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('keyup', handleKeyup)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('keyup', handleKeyup)
    }
  }, [])
}

export default useHotkey

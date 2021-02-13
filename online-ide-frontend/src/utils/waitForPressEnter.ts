import { RefObject } from 'react'

type PressEnterCallback = () => void

function isEnterPressed (event: KeyboardEvent) {
  return event.key === 'Enter'
}

function makePressEnterHandler (element: RefObject<HTMLElement>, callback: PressEnterCallback) {
  const pressEnterHandler = (e: KeyboardEvent) => {
    if (!isEnterPressed(e)) {
      return
    }

    callback()
    element.current?.removeEventListener('keydown', pressEnterHandler)
  }

  return pressEnterHandler
}

function waitForPressEnter (ref: RefObject<HTMLElement>, callback: PressEnterCallback) {
  ref.current?.addEventListener('keydown', makePressEnterHandler(ref, callback), false)
}

export default waitForPressEnter

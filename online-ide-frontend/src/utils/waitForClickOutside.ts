import { RefObject } from 'react'

type ClickOutsideCallback = () => void

function isClickedInside (element: RefObject<HTMLElement>, event: MouseEvent) {
  return !element?.current || element?.current.contains(event.target as HTMLElement)
}

function makeMouseDownHandler (element: RefObject<HTMLElement>, callback: ClickOutsideCallback) {
  const mouseDownHandler = (e: MouseEvent) => {
    if (isClickedInside(element, e)) {
      return
    }

    callback()
    document.removeEventListener('mousedown', mouseDownHandler)
  }

  return mouseDownHandler
}

function waitForClickOutside (ref: RefObject<HTMLElement>, callback: ClickOutsideCallback) {
  document.addEventListener('mousedown', makeMouseDownHandler(ref, callback), false)
}

export default waitForClickOutside

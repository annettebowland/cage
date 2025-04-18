import { useEffect } from 'preact/hooks'

import { createFocusTrapKeyDownHandler } from '../../utilities/private/create-focus-trap-key-down-handler.js'

export function useFocusTrap(rootElement?: HTMLElement): void {
  useEffect(
    function () {
      let handleKeyDown = createFocusTrapKeyDownHandler(rootElement)
      window.addEventListener('keydown', handleKeyDown)
      return function (): void {
        window.removeEventListener('keydown', handleKeyDown)
      }
    },
    [rootElement]
  )
}

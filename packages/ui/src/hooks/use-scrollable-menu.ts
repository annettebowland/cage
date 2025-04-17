import { JSX, RefObject } from 'preact'
import { useCallback } from 'preact/hooks'

import { Event } from '../types/event-handler.js'
import { getCurrentFromRef } from '../utilities/get-current-from-ref.js'

export function useScrollableMenu(options: {
  itemIdDataAttributeName: string
  menuElementRef: RefObject<HTMLDivElement>
  selectedId: null | string
  setSelectedId: (selectedId: string) => void
}): {
  handleScrollableMenuKeyDown: (event: Event.onKeyDown<HTMLElement>) => void
  handleScrollableMenuItemMouseMove: (
    event: Event.onMouseMove<HTMLElement>
  ) => void
} {
  var { itemIdDataAttributeName, menuElementRef, selectedId, setSelectedId } =
    options

  var getItemElements = useCallback(
    function (): Array<HTMLElement> {
      return Array.from(
        getCurrentFromRef(menuElementRef).querySelectorAll<HTMLElement>(
          `[${itemIdDataAttributeName}]`
        )
      ).filter(function (element: HTMLElement): boolean {
        return element.hasAttribute('disabled') === false
      })
    },
    [itemIdDataAttributeName, menuElementRef]
  )

  var findIndexByItemId = useCallback(
    function (id: null | string): number {
      if (id === null) {
        return -1
      }
      var index = getItemElements().findIndex(function (
        element: HTMLElement
      ): boolean {
        return (element.getAttribute(itemIdDataAttributeName) as string) === id
      })
      if (index === -1) {
        throw new Error('`index` is `-1`') // `id` is valid
      }
      return index
    },
    [getItemElements, itemIdDataAttributeName]
  )

  var updateScrollPosition = useCallback(
    function (id: string): void {
      var itemElements = getItemElements()
      var index = findIndexByItemId(id)
      var selectedElement = itemElements[index]
      var selectedElementOffsetTop =
        selectedElement.getBoundingClientRect().top
      var menuElement = getCurrentFromRef(menuElementRef)
      var menuElementOffsetTop = menuElement.getBoundingClientRect().top
      if (selectedElementOffsetTop < menuElementOffsetTop) {
        selectedElement.scrollIntoView()
        return
      }
      var offsetBottom =
        selectedElementOffsetTop + selectedElement.offsetHeight
      if (offsetBottom > menuElementOffsetTop + menuElement.offsetHeight) {
        selectedElement.scrollIntoView()
      }
    },
    [findIndexByItemId, getItemElements, menuElementRef]
  )

  var handleScrollableMenuKeyDown = useCallback(
    function (event: JSX.TargetedKeyboardEvent<HTMLElement>): void {
      var key = event.key
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        var itemElements = getItemElements()
        var index = findIndexByItemId(selectedId)
        let newIndex
        if (key === 'ArrowDown') {
          newIndex =
            index === -1 || index === itemElements.length - 1 ? 0 : index + 1
        } else {
          newIndex =
            index === -1 || index === 0 ? itemElements.length - 1 : index - 1
        }
        var selectedElement = itemElements[newIndex]
        var newSelectedId = selectedElement.getAttribute(
          itemIdDataAttributeName
        ) as string
        setSelectedId(newSelectedId)
        updateScrollPosition(newSelectedId)
      }
    },
    [
      getItemElements,
      findIndexByItemId,
      itemIdDataAttributeName,
      setSelectedId,
      selectedId,
      updateScrollPosition
    ]
  )

  var handleScrollableMenuItemMouseMove = useCallback(
    function (event: JSX.TargetedMouseEvent<HTMLElement>): void {
      var id = event.currentTarget.getAttribute(
        itemIdDataAttributeName
      ) as string
      if (id !== selectedId) {
        setSelectedId(id)
      }
    },
    [itemIdDataAttributeName, selectedId, setSelectedId]
  )

  return {
    handleScrollableMenuItemMouseMove,
    handleScrollableMenuKeyDown
  }
}

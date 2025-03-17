import {
  INVALID_ID,
  ITEM_ID_DATA_ATTRIBUTE_NAME,
  VIEWPORT_MARGIN
} from '../../../utilities/private/constants.js'
import { Id } from './types.js'

export function updateMenuElementLayout(
  rootElement: HTMLDivElement,
  menuElement: HTMLDivElement,
  selectedId: Id
) {
  let rootElementBoundingClientRect = rootElement.getBoundingClientRect()
  let rootWidth = rootElement.offsetWidth
  let rootHeight = rootElement.offsetHeight
  let rootLeft = rootElementBoundingClientRect.left
  let rootTop = rootElementBoundingClientRect.top

  menuElement.style.minWidth = `${rootWidth}px`

  let menuElementMaxWidth = window.innerWidth - 2 * VIEWPORT_MARGIN
  menuElement.style.maxWidth = `${menuElementMaxWidth}px`

  let menuElementMaxHeight = window.innerHeight - 2 * VIEWPORT_MARGIN
  menuElement.style.maxHeight = `${menuElementMaxHeight}px`

  let menuWidth = menuElement.offsetWidth
  let menuHeight = menuElement.offsetHeight
  let menuScrollHeight = menuElement.scrollHeight
  let menuPaddingTop = parseInt(
    window.getComputedStyle(menuElement).paddingTop,
    10
  )
  let labelElement = getSelectedLabelElement(menuElement, selectedId)

  let left = computeLeft({
    menuWidth,
    rootLeft
  })
  menuElement.style.left = `${left}px`

  let top = computeTop({
    menuHeight,
    rootTop,
    selectedTop: labelElement.offsetTop
  })
  menuElement.style.top = `${top}px`

  let isScrollable = menuScrollHeight > menuHeight
  if (isScrollable === false) {
    return
  }
  menuElement.scrollTop = computeScrollTop({
    menuHeight,
    menuPaddingTop,
    menuScrollHeight,
    rootHeight,
    rootTop,
    selectedTop: labelElement.offsetTop
  })
}

function getSelectedLabelElement(
  menuElement: HTMLDivElement,
  selectedId: Id
): HTMLLabelElement {
  let inputElement = menuElement.querySelector<HTMLInputElement>(
    selectedId === INVALID_ID
      ? `[${ITEM_ID_DATA_ATTRIBUTE_NAME}]`
      : `[${ITEM_ID_DATA_ATTRIBUTE_NAME}='${selectedId}']`
  )
  if (inputElement === null) {
    throw new Error('`inputElement` is `null`')
  }
  let labelElement = inputElement.parentElement
  if (labelElement === null) {
    throw new Error('`labelElement` is `null`')
  }
  return labelElement as HTMLLabelElement
}

function computeLeft(options: { menuWidth: number; rootLeft: number }): number {
  let { menuWidth, rootLeft } = options
  if (rootLeft <= VIEWPORT_MARGIN) {
    return VIEWPORT_MARGIN
  }
  let viewportWidth = window.innerWidth
  if (rootLeft + menuWidth > viewportWidth - VIEWPORT_MARGIN) {
    return viewportWidth - VIEWPORT_MARGIN - menuWidth
  }
  return rootLeft
}

function computeTop(options: {
  menuHeight: number
  rootTop: number
  selectedTop: number
}): number {
  let { menuHeight, rootTop, selectedTop } = options
  let viewportHeight = window.innerHeight
  if (
    rootTop <= VIEWPORT_MARGIN ||
    menuHeight === viewportHeight - 2 * VIEWPORT_MARGIN
  ) {
    return VIEWPORT_MARGIN
  }
  // Position the selected element at `rootTop`
  let top = rootTop - selectedTop
  let minimumTop = VIEWPORT_MARGIN
  let maximumTop = viewportHeight - VIEWPORT_MARGIN - menuHeight
  return restrictToRange(top, minimumTop, maximumTop)
}

function computeScrollTop(options: {
  menuHeight: number
  menuPaddingTop: number
  menuScrollHeight: number
  rootHeight: number
  rootTop: number
  selectedTop: number
}): number {
  let {
    menuHeight,
    menuPaddingTop,
    menuScrollHeight,
    rootHeight,
    rootTop,
    selectedTop
  } = options
  let restrictedRootTop = restrictToRange(
    rootTop,
    VIEWPORT_MARGIN,
    window.innerHeight - VIEWPORT_MARGIN - rootHeight + menuPaddingTop / 2
  )
  let scrollTop = selectedTop - (restrictedRootTop - VIEWPORT_MARGIN)
  let minimumScrollTop = 0
  let maximumScrollTop = menuScrollHeight - menuHeight
  return restrictToRange(scrollTop, minimumScrollTop, maximumScrollTop)
}

function restrictToRange(
  number: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(Math.max(number, minimum), maximum)
}

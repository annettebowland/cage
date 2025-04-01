import { HIDE_MENU_TOGGLE_BUTTON_BREAKPOINT } from './constants.js'
import { parseInternalLinkHref } from './parse-internal-link-href.js'

export function setUpToc({
  headersElementSelector,
  tocElementSelector,
  activeTocItemClassName
}) {
  let headers = parseHeaders(headersElementSelector)

  if (window.innerWidth < HIDE_MENU_TOGGLE_BUTTON_BREAKPOINT) {
    function handleWindowScroll() {
      updateTocActiveElement({
        activeTocItemClassName,
        headers,
        tocElementSelector
      })
    }
    window.addEventListener('scroll', handleWindowScroll)
    return
  }

  window.history.scrollRestoration = 'manual'

  function handleInternalLinkClick(event) {
    if (event.metaKey === true || event.shiftKey === true) {
      return
    }
    var id = parseInternalLinkHref(event.target)
    if (id === null) {
      return
    }
    if (
      scrollToId({
        activeTocItemClassName,
        headers,
        id,
        pushState: true,
        tocElementSelector
      }) === true
    ) {
      event.preventDefault()
    }
  }
  window.addEventListener('click', handleInternalLinkClick)

  function handlePopState(event) {
    event.preventDefault()
    if (event.state === null) {
      window.scrollTo({ top: 0 })
      return
    }
    window.scrollTo({ top: event.state.scrollY })
  }
  window.addEventListener('popstate', handlePopState)

  function handleWindowResize() {
    headers = parseHeaders(headersElementSelector)
    handleWindowScroll()
  }
  window.addEventListener('resize', handleWindowResize)

  function handleWindowScroll() {
    updateTocActiveElement({
      activeTocItemClassName,
      headers,
      tocElementSelector
    })
    history.replaceState(
      { scrollY: window.scrollY },
      null,
      window.location.hash
    )
  }
  window.addEventListener('scroll', handleWindowScroll)

  var id = window.location.hash.slice(1)
  if (id === '') {
    return
  }
  scrollToId({
    activeTocItemClassName,
    headers,
    id,
    pushState: false,
    tocElementSelector
  })
}

function parseHeaders(headersElementSelector) {
  var headerElements = Array.prototype.slice.call(
    document.body.querySelectorAll(headersElementSelector)
  )

  var headers = []
  for (var headerElement of headerElements) {
    headers.push({
      id: headerElement.getAttribute('id'),
      scrollY: headerElement.offsetTop
    })
  }

  var maxScrollY = document.documentElement.offsetHeight - window.innerHeight
  if (headers[headers.length - 1].scrollY <= maxScrollY) {
    return headers
  }

  var lastHeaderAboveMaxScrollYIndex = (function () {
    let index = headers.length - 1
    while (index >= 0) {
      if (headers[index].scrollY <= maxScrollY) {
        return index
      }
      index -= 1
    }
    return 0
  })()

  var numerator = maxScrollY - headers[lastHeaderAboveMaxScrollYIndex].scrollY
  var denominator =
    headers[headers.length - 1].scrollY -
    headers[lastHeaderAboveMaxScrollYIndex].scrollY
  var ratio = numerator / denominator

  return headers.map(function (header, index) {
    if (index <= lastHeaderAboveMaxScrollYIndex) {
      return header
    }
    if (index === headers.length - 1) {
      return {
        ...header,
        scrollY: maxScrollY
      }
    }
    return {
      ...header,
      scrollY: Math.round(
        headers[lastHeaderAboveMaxScrollYIndex].scrollY +
          (header.scrollY - headers[lastHeaderAboveMaxScrollYIndex].scrollY) *
            ratio
      )
    }
  })
}

function scrollToId({
  headers,
  id,
  pushState,
  tocElementSelector,
  activeTocItemClassName
}) {
  var header = headers.find(function (header) {
    return header.id === id
  })
  if (typeof header === 'undefined') {
    updateTocActiveElement({
      activeTocItemClassName,
      headers,
      tocElementSelector
    })
    return false
  }
  var state = { scrollY: header.scrollY }
  if (pushState === true) {
    history.pushState(state, null, `#${id}`)
  } else {
    history.replaceState(state, null, `#${id}`)
  }
  window.scrollTo({ top: header.scrollY })
  updateTocActiveElement({
    activeTocItemClassName,
    headers,
    tocElementSelector
  })
  return true
}

function updateTocActiveElement({
  headers,
  tocElementSelector,
  activeTocItemClassName
}) {
  var tocElement = document.querySelector(tocElementSelector)
  var previousActiveElement = tocElement.querySelector(
    `.${activeTocItemClassName}`
  )
  if (previousActiveElement !== null) {
    previousActiveElement.classList.remove(activeTocItemClassName)
  }
  var id = computeActiveId(headers)
  if (id === null) {
    return
  }
  var activeElement = tocElement.querySelector(`[href="#${id}"]`)
  if (activeElement === null) {
    return
  }
  activeElement.classList.add(activeTocItemClassName)
}

function computeActiveId(headers) {
  var scrollY = Math.ceil(window.scrollY)
  for (var header of headers.slice().reverse()) {
    if (header.scrollY <= scrollY) {
      return header.id
    }
  }
  return null
}

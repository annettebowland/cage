import { useCallback, useState } from 'preact/hooks'

import { useFocusTrap } from '../use-focus-trap/use-focus-trap.js'
import {
  InitialFocus,
  useInitialFocus
} from '../use-initial-focus/use-initial-focus.js'
import { useWindowKeyDown } from '../use-window-key-down.js'

export function useForm<State>(
  initialState: State,
  options: {
    close: (state: State) => void
    transform?: (state: State) => State
    validate?: (state: State) => boolean
    submit: (state: State) => void
  }
): {
  disabled: boolean
  formState: State
  handleSubmit: () => void
  initialFocus: InitialFocus
  setFormState: <Name extends keyof State>(
    state: State[Name],
    name: undefined | Name
  ) => void
} {
  let { close, submit, transform, validate } = options

  let [formState, setState] = useState(initialState)

  let setFormState = useCallback(
    function <Name extends keyof State>(value: State[Name], name?: Name) {
      if (typeof name === 'undefined') {
        throw new Error('`name` is `undefined`')
      }
      setState(function (previousState: State): State {
        let newState = {
          ...previousState,
          ...{ [name]: value }
        }
        return typeof transform === 'undefined' ? newState : transform(newState)
      })
    },
    [transform]
  )

  let handleSubmit = useCallback(
    function (): void {
      if (typeof validate !== 'undefined' && validate(formState) === false) {
        return
      }
      submit(formState)
    },
    [formState, submit, validate]
  )
  useWindowKeyDown('Enter', handleSubmit)

  let handleClose = useCallback(
    function (): void {
      close(formState)
    },
    [close, formState]
  )
  useWindowKeyDown('Escape', handleClose)

  useFocusTrap()

  let disabled =
    typeof validate !== 'undefined' ? validate(formState) === false : false

  let initialFocus = useInitialFocus()
  return {
    disabled,
    formState,
    handleSubmit,
    initialFocus,
    setFormState
  }
}

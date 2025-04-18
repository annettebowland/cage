/* eslint-disable no-console */
import { MIXED_STRING } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useState } from 'preact/hooks'

import { useInitialFocus } from '../../../../hooks/use-initial-focus/use-initial-focus.js'
import { RGBA } from '../../../../types/rgba.js'
import { TextboxColor } from '../textbox-color.js'

export default {
  tags: ['1'],
  title: 'Components/Textbox Color'
}

export const Empty = function () {
  const [hexColor, setHexColor] = useState<string>('')
  const [opacity, setOpacity] = useState<string>('')
  function handleHexColorInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newHexColor = event.currentTarget.value
    console.log(newHexColor)
    setHexColor(newHexColor)
  }
  function handleOpacityInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newOpacity = event.currentTarget.value
    console.log(newOpacity)
    setOpacity(newOpacity)
  }
  return (
    <TextboxColor
      hexColor={hexColor}
      onHexColorInput={handleHexColorInput}
      onOpacityInput={handleOpacityInput}
      opacity={opacity}
    />
  )
}

export const Focused = function () {
  const [hexColor, setHexColor] = useState<string>('')
  const [opacity, setOpacity] = useState<string>('')
  function handleHexColorInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newHexColor = event.currentTarget.value
    console.log(newHexColor)
    setHexColor(newHexColor)
  }
  function handleOpacityInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newOpacity = event.currentTarget.value
    console.log(newOpacity)
    setOpacity(newOpacity)
  }
  return (
    <TextboxColor
      {...useInitialFocus()}
      hexColor={hexColor}
      onHexColorInput={handleHexColorInput}
      onOpacityInput={handleOpacityInput}
      opacity={opacity}
    />
  )
}

export const Placeholder = function () {
  const [hexColor, setHexColor] = useState<string>('')
  const [opacity, setOpacity] = useState<string>('')
  function handleHexColorInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newHexColor = event.currentTarget.value
    console.log(newHexColor)
    setHexColor(newHexColor)
  }
  function handleOpacityInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newOpacity = event.currentTarget.value
    console.log(newOpacity)
    setOpacity(newOpacity)
  }
  return (
    <TextboxColor
      hexColor={hexColor}
      hexColorPlaceholder="Color"
      onHexColorInput={handleHexColorInput}
      onOpacityInput={handleOpacityInput}
      opacity={opacity}
    />
  )
}

export const Filled = function () {
  const [hexColor, setHexColor] = useState<string>('0D99FF')
  const [opacity, setOpacity] = useState<string>('100')
  function handleHexColorInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newHexColor = event.currentTarget.value
    console.log(newHexColor)
    setHexColor(newHexColor)
  }
  function handleOpacityInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newOpacity = event.currentTarget.value
    console.log(newOpacity)
    setOpacity(newOpacity)
  }
  return (
    <TextboxColor
      hexColor={hexColor}
      onHexColorInput={handleHexColorInput}
      onOpacityInput={handleOpacityInput}
      opacity={opacity}
    />
  )
}

export const Disabled = function () {
  const [hexColor, setHexColor] = useState<string>('0D99FF')
  const [opacity, setOpacity] = useState<string>('100')
  function handleHexColorInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newHexColor = event.currentTarget.value
    console.log(newHexColor)
    setHexColor(newHexColor)
  }
  function handleOpacityInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newOpacity = event.currentTarget.value
    console.log(newOpacity)
    setOpacity(newOpacity)
  }
  return (
    <TextboxColor
      disabled
      hexColor={hexColor}
      onHexColorInput={handleHexColorInput}
      onOpacityInput={handleOpacityInput}
      opacity={opacity}
    />
  )
}

export const FullWidth = function () {
  const [hexColor, setHexColor] = useState<string>('0D99FF')
  const [opacity, setOpacity] = useState<string>('100')
  function handleHexColorInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newHexColor = event.currentTarget.value
    console.log(newHexColor)
    setHexColor(newHexColor)
  }
  function handleOpacityInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newOpacity = event.currentTarget.value
    console.log(newOpacity)
    setOpacity(newOpacity)
  }
  return (
    <TextboxColor
      fullWidth
      hexColor={hexColor}
      onHexColorInput={handleHexColorInput}
      onOpacityInput={handleOpacityInput}
      opacity={opacity}
    />
  )
}
FullWidth.parameters = {
  fixedWidth: true
}

export const Mixed = function () {
  const [hexColor, setHexColor] = useState<string>(MIXED_STRING)
  const [opacity, setOpacity] = useState<string>(MIXED_STRING)
  function handleHexColorInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newHexColor = event.currentTarget.value
    console.log(newHexColor)
    setHexColor(newHexColor)
  }
  function handleOpacityInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newOpacity = event.currentTarget.value
    console.log(newOpacity)
    setOpacity(newOpacity)
  }
  return (
    <TextboxColor
      hexColor={hexColor}
      onHexColorInput={handleHexColorInput}
      onOpacityInput={handleOpacityInput}
      opacity={opacity}
    />
  )
}

export const RevertOnEscapeKeyDown = function () {
  const [hexColor, setHexColor] = useState<string>('0D99FF')
  const [opacity, setOpacity] = useState<string>('100')
  function handleHexColorInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newHexColor = event.currentTarget.value
    console.log(newHexColor)
    setHexColor(newHexColor)
  }
  function handleOpacityInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newOpacity = event.currentTarget.value
    console.log(newOpacity)
    setOpacity(newOpacity)
  }
  return (
    <TextboxColor
      hexColor={hexColor}
      onHexColorInput={handleHexColorInput}
      onOpacityInput={handleOpacityInput}
      opacity={opacity}
      revertOnEscapeKeyDown
    />
  )
}

export const OnValueInput = function () {
  const [hexColor, setHexColor] = useState<string>('0D99FF')
  const [opacity, setOpacity] = useState<string>('100')
  function handleRgbaColorValueInput(newRgbaColor: null | RGBA) {
    console.log(newRgbaColor)
  }
  function handleOpacityNumericValueInput(newOpacity: null | number) {
    console.log(newOpacity)
  }
  return (
    <TextboxColor
      hexColor={hexColor}
      onHexColorValueInput={setHexColor}
      onOpacityNumericValueInput={handleOpacityNumericValueInput}
      onOpacityValueInput={setOpacity}
      onRgbaColorValueInput={handleRgbaColorValueInput}
      opacity={opacity}
    />
  )
}

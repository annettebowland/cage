/* eslint-disable no-console */
import { h, JSX } from 'preact'
import { useState } from 'preact/hooks'

import { useInitialFocus } from '../../../hooks/use-initial-focus/use-initial-focus.js'
import { IconComponent16 } from '../../../icons/icon-16/icon-component-16.js'
import { Layer } from '../layer.js'

export default {
  parameters: {
    fixedWidth: true
  },
  tags: ['3'],
  title: 'Components/Layer/Component Unselected'
}

export const Passive = function () {
  const [value, setValue] = useState<boolean>(false)
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <Layer
      component
      icon={<IconComponent16 />}
      onChange={handleChange}
      value={value}
    >
      Text
    </Layer>
  )
}

export const Focused = function () {
  const [value, setValue] = useState<boolean>(false)
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <Layer
      {...useInitialFocus()}
      component
      icon={<IconComponent16 />}
      onChange={handleChange}
      value={value}
    >
      Text
    </Layer>
  )
}

export const Bold = function () {
  const [value, setValue] = useState<boolean>(false)
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <Layer
      bold
      component
      icon={<IconComponent16 />}
      onChange={handleChange}
      value={value}
    >
      Text
    </Layer>
  )
}

export const Description = function () {
  const [value, setValue] = useState<boolean>(false)
  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <Layer
      component
      description="Description"
      icon={<IconComponent16 />}
      onChange={handleChange}
      value={value}
    >
      Text
    </Layer>
  )
}

export const OnValueChange = function () {
  const [value, setValue] = useState<boolean>(false)
  function handleValueChange(newValue: boolean) {
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <Layer
      component
      icon={<IconComponent16 />}
      onValueChange={handleValueChange}
      value={value}
    >
      Text
    </Layer>
  )
}

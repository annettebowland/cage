/* eslint-disable no-console */
import { h, JSX } from 'preact'
import { useState } from 'preact/hooks'

import { useInitialFocus } from '../../../../hooks/use-initial-focus/use-initial-focus.js'
import { IconFrame16 } from '../../../../icons/icon-16/icon-frame-16.js'
import {
  TextboxAutocomplete,
  TextboxAutocompleteOption
} from '../textbox-autocomplete.js'

export default {
  parameters: {
    fixedWidth: true
  },
  tags: ['1'],
  title: 'Components/Textbox Autocomplete'
}

export const Empty = function () {
  const [value, setValue] = useState<string>('')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      onInput={handleInput}
      options={options}
      value={value}
    />
  )
}

export const Focused = function () {
  const [value, setValue] = useState<string>('')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      {...useInitialFocus()}
      onInput={handleInput}
      options={options}
      value={value}
    />
  )
}

export const Placeholder = function () {
  const [value, setValue] = useState<string>('')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      onInput={handleInput}
      options={options}
      placeholder="Placeholder"
      value={value}
    />
  )
}

export const Filled = function () {
  const [value, setValue] = useState<string>('foo')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      onInput={handleInput}
      options={options}
      value={value}
    />
  )
}

export const Disabled = function () {
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput() {
    throw new Error('This function should not be called')
  }
  return (
    <TextboxAutocomplete
      disabled
      onInput={handleInput}
      options={options}
      value="foo"
    />
  )
}

export const DisabledOption = function () {
  const [value, setValue] = useState<string>('foo')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { disabled: true, value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      onInput={handleInput}
      options={options}
      value={value}
    />
  )
}

export const Icon = function () {
  const [value, setValue] = useState<string>('foo')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      icon={<IconFrame16 />}
      onInput={handleInput}
      options={options}
      value={value}
    />
  )
}

export const TextIcon = function () {
  const [value, setValue] = useState<string>('foo')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      icon="W"
      onInput={handleInput}
      options={options}
      value={value}
    />
  )
}

export const RevertOnEscapeKeyDown = function () {
  const [value, setValue] = useState<string>('foo')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      onInput={handleInput}
      options={options}
      revertOnEscapeKeyDown
      value={value}
    />
  )
}

export const Strict = function () {
  const [value, setValue] = useState<string>('foo')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      onInput={handleInput}
      options={options}
      strict
      value={value}
    />
  )
}

export const Filter = function () {
  const [value, setValue] = useState<string>('foo')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      filter
      onInput={handleInput}
      options={options}
      value={value}
    />
  )
}

export const StrictFilter = function () {
  const [value, setValue] = useState<string>('foo')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      filter
      onInput={handleInput}
      options={options}
      strict
      value={value}
    />
  )
}

export const MenuTop = function () {
  const [value, setValue] = useState<string>('foo')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      onInput={handleInput}
      options={options}
      top
      value={value}
    />
  )
}

export const OnValueInput = function () {
  const [value, setValue] = useState<string>('foo')
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'foo' },
    { value: 'bar' },
    { value: 'baz' },
    '-',
    { header: 'Header' },
    { value: 'qux' }
  ]
  function handleValueInput(newValue: string) {
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <TextboxAutocomplete
      onValueInput={handleValueInput}
      options={options}
      value={value}
    />
  )
}

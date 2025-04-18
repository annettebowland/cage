import { ComponentChildren, Fragment, h } from 'preact'
import { useCallback } from 'preact/hooks'

import { Event, EventHandler } from '../../types/event-handler.js'
import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { createComponent } from '../../utilities/create-component.js'
import { noop } from '../../utilities/no-op.js'
import { ITEM_ID_DATA_ATTRIBUTE_NAME } from '../../utilities/private/constants.js'
import styles from './tabs.module.css'

export interface TabsProps extends FocusableComponentProps<HTMLDivElement> {
  onChange?: EventHandler.onChange<HTMLInputElement>
  onValueChange?: EventHandler.onValueChange<string>
  options: Array<TabsOption>
  value: null | string
}
export type TabsOption = {
  children: ComponentChildren
  value: string
}

export const Tabs = createComponent<HTMLDivElement, TabsProps>(function (
  {
    onChange = noop,
    onCommand, // eslint-disable-line @typescript-eslint/no-unused-vars
    onKeyDown = noop,
    onValueChange = noop,
    options,
    propagateEscapeKeyDown = true,
    value,
    ...rest
  },
  ref
) {
  const handleChange = useCallback(
    function (event: Event.onChange<HTMLInputElement>) {
      onChange(event)
      const id = event.currentTarget.getAttribute(ITEM_ID_DATA_ATTRIBUTE_NAME)
      if (id === null) {
        throw new Error('`id` is `null`')
      }
      const newValue = options[parseInt(id, 10)].value
      onValueChange(newValue)
    },
    [onChange, onValueChange, options]
  )

  const handleKeyDown = useCallback(
    function (event: Event.onKeyDown<HTMLInputElement>) {
      onKeyDown(event)
      if (event.key === 'Escape') {
        if (propagateEscapeKeyDown === false) {
          event.stopPropagation()
        }
        event.currentTarget.blur()
      }
    },
    [onKeyDown, propagateEscapeKeyDown]
  )

  const activeOption = options.find(function (option: TabsOption): boolean {
    return option.value === value
  })

  return (
    <Fragment>
      <div ref={ref} class={styles.tabs}>
        {options.map(function (option: TabsOption, index: number) {
          return (
            <label key={index} class={styles.tab}>
              <input
                {...rest}
                checked={value === option.value}
                class={styles.input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                type="radio"
                value={option.value}
                {...{ [ITEM_ID_DATA_ATTRIBUTE_NAME]: `${index}` }}
              />
              <div class={styles.value}>{option.value}</div>
            </label>
          )
        })}
      </div>
      {typeof activeOption === 'undefined' ? null : (
        <div class={styles.children}>{activeOption.children}</div>
      )}
    </Fragment>
  )
})

import { Fragment, h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { Banner } from './components/banner/banner.js'
import { Button } from './components/button/button.js'
import { Dropdown } from './components/dropdown/dropdown.js'
import { FileUploadButton } from './components/file-upload/file-upload-button/file-upload-button.js'
import { FileUploadDropzone } from './components/file-upload/file-upload-dropzone/file-upload-dropzone.js'
import { Layer } from './components/layer/layer.js'
import { Modal } from './components/modal/modal.js'
import { RangeSlider } from './components/range-slider/range-slider.js'
import { SegmentedControl } from './components/segmented-control/segmented-control.js'
import { Text } from './components/text/text.js'
import { TextboxColor } from './components/textbox/textbox-color/textbox-color.js'
import { TextboxNumeric } from './components/textbox/textbox-numeric/textbox-numeric.js'
import { Toggle } from './components/toggle/toggle.js'
import { IconComponent16 } from './icons/icon-16/icon-component-16.js'
import { IconFrame16 } from './icons/icon-16/icon-frame-16.js'
import { IconApprovedCheckmark24 } from './icons/icon-24/icon-approved-checkmark-24.js'
import { IconAutoLayoutPaddingHorizontal24 } from './icons/icon-24/icon-auto-layout-padding-horizontal-24.js'
import { IconInfoSmall24 } from './icons/icon-24/icon-info-small-24.js'
import { IconWarningSmall24 } from './icons/icon-24/icon-warning-small-24.js'
import { Bold } from './inline-text/bold/bold.js'
import { Muted } from './inline-text/muted/muted.js'
import { Columns } from './layout/columns/columns.js'
import { Stack } from './layout/stack/stack.js'
import { VerticalSpace } from './layout/vertical-space/vertical-space.js'

export default {
  title: 'Index'
}

const boxStyle = {
  alignItems: 'center',
  backgroundColor: 'var(--figma-color-bg)',
  display: 'flex',
  height: '92px',
  justifyContent: 'center',
  padding: '24px 40px'
}

export const Index = function () {
  useEffect(function () {
    document.body.style.backgroundColor = 'var(--figma-color-bg-secondary)'
  }, [])
  const [componentLayerValue, setComponentLayerValue] = useState<boolean>(true)
  const [dropdownValue, setDropdownValue] = useState<string>('Regular')
  const [frameLayerValue, setFrameLayerValue] = useState<boolean>(true)
  const [rangeSliderValue, setRangeSliderValue] = useState<string>('42')
  const [segmentedControlValue, setSegmentedControlValue] =
    useState<string>('1st')
  const [textboxColorHexColor, setTextboxColorHexColor] =
    useState<string>('0D99FF')
  const [textboxColorOpacity, setTextboxColorOpacity] = useState<string>('50')
  const [textboxNumericValue, setTextboxNumericValue] = useState<string>('42')
  const [toggleValue, setToggleValue] = useState<boolean>(true)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <Columns space="extraLarge">
        <div style={{ width: '240px' }}>
          <Stack space="large">
            <div style={boxStyle}>
              <Toggle
                onChange={function (
                  event: JSX.TargetedEvent<HTMLInputElement>
                ) {
                  setToggleValue(event.currentTarget.checked)
                }}
                value={toggleValue}
              >
                <Text>Auto-update</Text>
              </Toggle>
            </div>
            <Stack space="extraSmall">
              <Button fullWidth>Make Something Wonderful</Button>
              <Button danger fullWidth>
                Discard Changes
              </Button>
              <Button disabled fullWidth loading>
                Loading
              </Button>
            </Stack>
            <div style={boxStyle}>
              <TextboxNumeric
                icon={<IconAutoLayoutPaddingHorizontal24 />}
                onInput={function (event: JSX.TargetedEvent<HTMLInputElement>) {
                  setTextboxNumericValue(event.currentTarget.value)
                }}
                value={textboxNumericValue}
              />
            </div>
            <Stack space="extraSmall">
              <Layer
                icon={<IconFrame16 />}
                onChange={function (
                  event: JSX.TargetedEvent<HTMLInputElement>
                ) {
                  setFrameLayerValue(event.currentTarget.checked)
                }}
                value={frameLayerValue}
              >
                Frame
              </Layer>
              <Layer
                bold
                component
                icon={<IconComponent16 />}
                onChange={function (
                  event: JSX.TargetedEvent<HTMLInputElement>
                ) {
                  setComponentLayerValue(event.currentTarget.checked)
                }}
                value={componentLayerValue}
              >
                Component
              </Layer>
            </Stack>
            <div style={boxStyle}>
              <RangeSlider
                maximum={100}
                minimum={0}
                onInput={function (event: JSX.TargetedEvent<HTMLInputElement>) {
                  setRangeSliderValue(event.currentTarget.value)
                }}
                value={rangeSliderValue}
              />
            </div>
            <div style={boxStyle}>
              <Button
                onClick={function () {
                  setModalOpen(true)
                }}
                secondary
              >
                Open Modal
              </Button>
              <Modal
                onCloseButtonClick={function () {
                  setModalOpen(false)
                }}
                onOverlayClick={function () {
                  setModalOpen(false)
                }}
                open={modalOpen}
                title="Modal"
              >
                <div
                  style={{ height: '120px', padding: '16px', width: '240px' }}
                >
                  <Button
                    onClick={function () {
                      setModalOpen(false)
                    }}
                    secondary
                  >
                    Close Modal
                  </Button>
                </div>
              </Modal>
            </div>
          </Stack>
        </div>
        <div style={{ width: '240px' }}>
          <Stack space="large">
            <div style={boxStyle}>
              <SegmentedControl
                onChange={function (
                  event: JSX.TargetedEvent<HTMLInputElement>
                ) {
                  setSegmentedControlValue(event.currentTarget.value)
                }}
                options={[{ value: '1st' }, { value: '2nd' }, { value: '3rd' }]}
                value={segmentedControlValue}
              />
            </div>
            <div
              style={{
                backgroundColor: 'var(--figma-color-bg)',
                padding: 'var(--space-12)'
              }}
            >
              <FileUploadDropzone
                acceptedFileTypes={['image/jpeg', 'image/png']}
                multiple
              >
                <Text align="center">
                  <Bold>Drop images here</Bold>
                </Text>
                <VerticalSpace space="small" />
                <Text align="center">
                  <Muted>or</Muted>
                </Text>
                <VerticalSpace space="small" />
                <FileUploadButton
                  acceptedFileTypes={['image/jpeg', 'image/png']}
                >
                  Choose Image Files
                </FileUploadButton>
              </FileUploadDropzone>
            </div>
            <div style={boxStyle}>
              <Dropdown
                onChange={function (
                  event: JSX.TargetedEvent<HTMLInputElement>
                ) {
                  setDropdownValue(event.currentTarget.value)
                }}
                options={[
                  { value: 'Light' },
                  { value: 'Regular' },
                  { value: 'Semibold' },
                  { value: 'Bold' }
                ]}
                value={dropdownValue}
              />
            </div>
            <Stack space="extraSmall">
              <Banner icon={<IconInfoSmall24 />}>
                Select a layer to get started
              </Banner>
              <Banner icon={<IconApprovedCheckmark24 />} variant="success">
                Plugin unlocked
              </Banner>
              <Banner icon={<IconWarningSmall24 />} variant="warning">
                Invalid license key
              </Banner>
            </Stack>
            <div style={boxStyle}>
              <TextboxColor
                hexColor={textboxColorHexColor}
                onHexColorInput={function (
                  event: JSX.TargetedEvent<HTMLInputElement>
                ) {
                  setTextboxColorHexColor(event.currentTarget.value)
                }}
                onOpacityInput={function (
                  event: JSX.TargetedEvent<HTMLInputElement>
                ) {
                  setTextboxColorOpacity(event.currentTarget.value)
                }}
                opacity={textboxColorOpacity}
              />
            </div>
          </Stack>
        </div>
      </Columns>
    </Fragment>
  )
}

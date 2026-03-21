// import { useRecord } from '@/hooks/record'
import { CustomVJSButton } from './CustomVJSButton'
import RecordIcon from '@/assets/record.svg?react'

const RecordingColor = '#ff6161'

export function RecordButton () {
  return (
    <CustomVJSButton
      className='lime-record-button'
      title='녹화'
    >
      <RecordIcon
        style={{ padding: '3px' }}
        // fill={isRecording ? RecordingColor : 'currentColor'}
      />
    </CustomVJSButton>
  )
}

import ReactDOM from 'react-dom'
import { useState, useEffect, useRef } from 'react'

import { useOptions } from '@/providers/useOptions'
import { CustomVJSButton } from './CustomVJSButton'
import EQIcon from '@/assets/eq.svg?react'

const ActivatedColor = '#71ff34'

function AudioCompressorButton () {
  const [activated, setActivated] = useState(false)

  return (
    <CustomVJSButton
      className='lime-audio-compressor-button'
      title='오디오 컴프레서 활성화'
      onClick={() => setActivated(!activated)}
    >
      <EQIcon
        style={{ padding: '3px' }}
        fill={activated ? ActivatedColor : 'white'}
      />
    </CustomVJSButton>
  )
}

function AudioCompressorContainer ({ children }: { children: React.ReactNode }) {
  const portal = usePortal({
    id: 'lime-audio-compressor',
    targetSelector: 'button.vjs-play-control',
    position: 'after',
  })

  return portal && ReactDOM.createPortal(children, portal)
}

export function AudioCompressorRenderer () {
  return (
    <AudioCompressorContainer>
      <AudioCompressorButton />
    </AudioCompressorContainer>
  )
}

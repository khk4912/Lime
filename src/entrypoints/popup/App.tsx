import './App.css'
import '@/assets/tailwind.css'

import { storage } from '#imports'

import { AudioCompressorOptions } from './AudioCompressorOptions'
import { useOptions } from '@/providers/useOptions'
import { type LimeOptions } from '@/utils/options'

type ToggleProps = {
  optionKey: keyof LimeOptions
  label: string
  description?: string
}

function Option ({ optionKey, label, description }: ToggleProps) {
  const { options, updateOption } = useOptions()

  if (optionKey === 'compressorDetails') { return null }

  const isChecked = options[optionKey]

  return (
    <div className='flex items-center gap-4 overflow-hidden'>
      <div className='min-w-0'>
        <p className='text-sm font-semibold text-white'>{label}</p>
        {description && <p className='whitespace-pre-line text-11 text-zinc-200 break-keep'>{description}</p>}
      </div>
      <label className='inline-flex items-center justify-end flex-1 cursor-pointer'>
        <input
          type='checkbox' value={`${label} toggle`}
          className='sr-only peer'
          checked={isChecked} onChange={(e) => { void updateOption(optionKey, e.target.checked) }}
        />
        <div className="relative w-9 h-5 bg-gray-500
                      peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300
                      rounded-full peer
                      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                      peer-checked:after:border-buffer after:content-['']
                      after:absolute after:top-0.5 after:inset-s-0.5
                     after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all
                     peer-checked:bg-lime-400"
        />
      </label>
    </div>
  )
}

function Header () {
  return (
    <div className='flex items-center w-full gap-4 px-5 py-4 my-5 border rounded-2xl border-white/10 bg-white/5'>
      <img
        src={browser.runtime.getURL('/icons/128.png')}
        alt='Lime extension logo'
        className='object-contain w-12 h-12 shrink-0'
      />
      <div className='min-w-0'>
        <h1 className='text-xl font-semibold tracking-tight text-white'>Lime</h1>
        <p className='text-xs text-zinc-500'>씨미 도우미</p>
        <span className='text-xs text-zinc-500'>v{__APP_VERSION__} </span>
      </div>
    </div>
  )
}

function App () {
  const { isLoading, options } = useOptions()

  return (
    <>
      <header className='flex-row px-8'>
        <Header />
      </header>
      <main className='flex-row items-center w-full px-8 overflow-scroll text-zinc-50'>
        <div className='grid gap-6 px-5 py-4 mt-3 overflow-scroll border border-white/10 rounded-2xl scrollbar-thumb-white/20 scrollbar-track-transparent scrollbar'>
          <Option
            optionKey='rec'
            label='녹화 (R)'
            description='녹화 버튼을 추가합니다.'
          />
          <Option
            optionKey='screenshot'
            label='스크린샷 (S)'
            description='스크린샷 버튼을 추가합니다.'
          />
          <Option
            optionKey='pip'
            label='PIP (P)'
            description='브라우저 PIP 버튼을 추가합니다.'
          />
          <Option
            optionKey='seek'
            label='탐색 (불안정, ← / →)'
            description='방송의 이전 또는 다음 부분으로 5초씩 이동합니다.'
          />
          <Option
            optionKey='useAudioCompressor'
            label='오디오 컴프레서 사용'
            description='오디오 컴프레서 버튼을 추가합니다.'
          />
          {options.useAudioCompressor && <AudioCompressorOptions />}
        </div>

        {isLoading && <p className='mt-4 text-xs text-zinc-400'>옵션을 불러오는 중...</p>}

      </main>
      <footer className='px-5 pb-5 mx-3 mt-3 text-xs text-zinc-400'>
        <div className='mx-auto mb-3 gap-3 flex items-center justify-center'>
          <button
            className='rounded-2xl border border-white/10 bg-white/5
                   py-2 px-4 hover:cursor-pointer hover:bg-white/10 transition-colors'
            onClick={() => {
              void storage.clear('local')
            }}
          >
            설정 초기화
          </button>

        </div>
        <p>
          Made with ❤️ by
          <a href='https://github.com/khk4912' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>
            <span> kosame</span>
          </a>
          <span> |  </span>
          <a href='https://github.com/khk4912/Lime' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>
            <span>Lime GitHub</span>
          </a>
        </p>
        <p className='text-xs text-zinc-600 break-keep'>Lime은 '씨미'와 관련이 없는 개인 프로젝트입니다.</p>
      </footer>

    </>
  )
}
export default App

import { useState } from 'react'

import { useOptions } from '@/providers/useOptions'
import { type LimeOptions } from '@/utils/options'

type CompressorDetailKey = keyof LimeOptions['compressorDetails']

type CompressorField = {
  key: CompressorDetailKey
  label: string
  description: string
  min: number
  max: number
  step: number
  formatValue: (value: number) => string
}

const compressorFields: CompressorField[] = [
  {
    key: 'threshold',
    label: 'Threshold',
    description: '얼마나 큰 소리부터 압축을 시작할지 설정합니다.',
    min: -100,
    max: 0,
    step: 1,
    formatValue: (value) => `${value} dB`
  },
  {
    key: 'knee',
    label: 'Knee',
    description: '압축을 얼마나 부드럽게 시작될지 설정합니다.',
    min: 0,
    max: 40,
    step: 1,
    formatValue: (value) => `${value} dB`
  },
  {
    key: 'ratio',
    label: 'Ratio',
    description: 'Threshold를 초과하는 소리가 얼마나 압축될지 설정합니다.',
    min: 1,
    max: 20,
    step: 1,
    formatValue: (value) => `${value}:1`
  },
  {
    key: 'attack',
    label: 'Attack',
    description: 'Threshold 초과 시 얼마나 빠르게 압축이 시작될지 설정합니다.',
    min: 0,
    max: 1000,
    step: 1,
    formatValue: (value) => `${value} ms`
  },
  {
    key: 'release',
    label: 'Release',
    description: 'Threshold 이하로 떨어졌을 때 얼마나 빠르게 압축이 풀릴지 설정합니다.',
    min: 0,
    max: 1000,
    step: 1,
    formatValue: (value) => `${value} ms`
  }
]

function getSliderFillStyle (value: number, min: number, max: number) {
  const ratio = ((value - min) / (max - min)) * 100

  return {
    background: `linear-gradient(90deg, rgba(163, 230, 53, 0.95) 0%, rgba(163, 230, 53, 0.95)
                 ${ratio}%, rgba(255, 255, 255, 0.10) ${ratio}%, rgba(255, 255, 255, 0.10) 100%)`
  }
}

type CompressorSliderProps = CompressorField & {
  value: number
  onChange: (value: number) => void
}

function CompressorSlider ({
  label, description,
  value, min, max, step,
  formatValue,
  onChange
}: CompressorSliderProps) {
  return (
    <div className='rounded-xl px-3 py-3'>
      <div className='mb-2 flex items-start justify-between'>
        <div className='min-w-0'>
          <p className='text-sm font-semibold tracking-tight text-white'>{label}</p>
          <span className='text-10/3 text-zinc-400 break-keep'>{description}</span>
        </div>
        <span className='shrink-0 min-w-13 rounded-full
                         border border-lime-300/20 bg-lime-300/10
                         px-2 py-1
                         text-11 text-center font-medium text-lime-200'
        >
          {formatValue(value)}
        </span>
      </div>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => { onChange(Number(event.target.value)) }}
        className='h-1.5 w-full cursor-pointer appearance-none rounded-full accent-lime-400'
        style={getSliderFillStyle(value, min, max)}
      />
      <div className='mt-2 flex items-center justify-between text-[11px] font-medium tabular-nums text-zinc-500'>
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  )
}

export function AudioCompressorOptions () {
  const { options, updateOption } = useOptions()
  const [isExpanded, setIsExpanded] = useState(false)

  const updateDetail = (key: CompressorDetailKey, value: number) => {
    void updateOption('compressorDetails', {
      ...options.compressorDetails,
      [key]: value,
    })
  }

  return (
    <section className='-mt-2 rounded-2xl border border-white/10 bg-white/3'>
      <div className='flex items-center justify-between gap-3 px-4 py-3'>
        <div className='min-w-0'>
          <p className='text-sm font-semibold text-white'>컴프레서 설정</p>
        </div>
        <button
          type='button'
          onClick={() => { setIsExpanded((prev) => !prev) }}
          aria-expanded={isExpanded}
          className='shrink-0 rounded-full border border-white/10
                    px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition-colors
                    hover:bg-white/10 hover:cursor-pointer'
        >
          {isExpanded ? '닫기' : '열기'}
        </button>

      </div>
      {isExpanded && (
        <div className='grid gap-3 border-t border-white/8'>
          {compressorFields.map((field) => (
            <CompressorSlider
              key={field.key}
              label={field.label}
              description={field.description}
              min={field.min}
              max={field.max}
              step={field.step}
              formatValue={field.formatValue}
              value={options.compressorDetails[field.key]}
              onChange={(value) => { updateDetail(field.key, value) }}
            />
          ))}
        </div>
      )}
    </section>
  )
}

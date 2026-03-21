import './App.css'
import '@/assets/tailwind.css'

type ToggleProps = {
  label: string
  description?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

function Toggle ({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className='flex items-center gap-4'>
      <div className='min-w-0'>
        <p className='text-sm font-medium text-white'>{label}</p>
        {description && <p className='text-xs text-zinc-200'>{description}</p>}
      </div>
      <label className='flex-1 inline-flex items-center cursor-pointer justify-end'>
        <input
          type='checkbox' value={`${label} toggle`}
          className='sr-only peer'
          checked={checked ?? false} onChange={(e) => onChange?.(e.target.checked)}
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
    <div className='flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5
                    px-5 py-4 mt-5 mb-10'
    >
      <img
        src={browser.runtime.getURL('/icons/128.png')}
        alt='Lime extension logo'
        className='h-12 w-12 shrink-0 object-contain'
      />
      <div className='min-w-0'>
        <h1 className='text-xl font-semibold tracking-tight text-white'>Lime</h1>
        <p className='text-sm text-zinc-500'>씨미 도우미</p>
      </div>
    </div>
  )
}
function App () {
  const [checked, setChecked] = useState(false)

  return (
    <>
      <main className='flex-row h-50 w-full
                     items-center px-8 text-zinc-50'
      >
        <Header />

        <Toggle
          label='Enable notifications'
          description='The quick brown fox jumps over the lazy dog.'
          checked={checked}
          onChange={() => { setChecked((checked) => !checked) }}
        />
      </main>
      <footer className='container mx-3 px-8 py-5'>
        <p>Made with ❤️ by <a href='https://github.com/khk4912' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:underline'>kosame</a></p>
        <p className='text-xs text-zinc-600 break-keep'>Lime은 '씨미'와 관련이 없는 개인 프로젝트입니다.</p>
      </footer>

    </>
  )
}

export default App

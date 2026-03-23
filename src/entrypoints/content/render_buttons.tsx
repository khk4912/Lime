import { inject } from '@/utils/inject'
import { PlayerButtonRenderer } from '@/components/PlayerButtonRenderer'
import { SeekerRenderer } from '@/components/SeekerRenderer'
import { OptionProvider } from '@/providers/OptionProvider'

export function RenderButtons () {
  let div = document.createElement('div')
  div.id = 'lime-buttons'

  document.body.appendChild(div)

  let root = inject(
    <OptionProvider>
      <PlayerButtonRenderer />
      <SeekerRenderer />
    </OptionProvider>,
    div
  )

  window.navigation?.addEventListener('navigate', () => {
    root.unmount()
    div.remove()

    div = document.createElement('div')
    div.id = 'lime-buttons'

    document.body.appendChild(div)
    root = inject(
      <OptionProvider>
        <PlayerButtonRenderer />
        <SeekerRenderer />
      </OptionProvider>,
      div
    )
  })
}

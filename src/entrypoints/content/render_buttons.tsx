import ReactDOM from 'react-dom/client'
import { createIntegratedUi, type ContentScriptContext } from '#imports'
import { waitForElement } from '@/hooks/element'
import { VJSButtonRenderer } from '@/components/Buttons'

export function RenderButtons (ctx: ContentScriptContext) {
  waitForElement('#vjs_video_3 > div.vjs-control-bar')

    .then(() => {
      const UI = createIntegratedUi(ctx, {
        position: 'inline',
        anchor: '#vjs_video_3',
        onMount: (container) => {
          const root = ReactDOM.createRoot(container)
          root.render(<VJSButtonRenderer />)
        },
      })

      UI.autoMount()
    })
    .catch(console.error)
}

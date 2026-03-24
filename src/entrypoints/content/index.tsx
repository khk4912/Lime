import { RenderUIs } from './render_buttons'

const contentScript = defineContentScript({
  matches: ['https://ci.me/*'],
  allFrames: true,
  main (ctx) {
    RenderUIs()
  }
})

export default contentScript

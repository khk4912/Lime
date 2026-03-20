import { RenderButtons } from './render_buttons'

const contentScript = defineContentScript({
  matches: ['https://ci.me/*'],
  allFrames: true,
  main (ctx) {
    RenderButtons(ctx)
  }
})

export default contentScript

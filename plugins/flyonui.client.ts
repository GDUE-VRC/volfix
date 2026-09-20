import type { IStaticMethods } from 'flyonui/flyonui'
import 'flyonui/flyonui'

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    window.HSStaticMethods.autoInit()
  })
})

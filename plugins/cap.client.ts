import wasmUrl from '@cap.js/wasm/browser/cap_wasm_bg.wasm?url'
import hashwxUrl from '@cap.js/wasm/browser/hashwx.wasm?url'
import pakoUrl from 'pako/dist/pako_inflate.min.js?url'

export default defineNuxtPlugin(() => {
  const absolute = (path: string) => new URL(path, window.location.origin).href

  window.CAP_CUSTOM_WASM_URL = absolute(wasmUrl)
  window.CAP_CUSTOM_HASHWX_URL = absolute(hashwxUrl)
  window.CAP_PAKO_URL = absolute(pakoUrl)
})

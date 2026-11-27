let solver: (() => Promise<{ token: string }>) | null = null

const absolute = (path: string) => new URL(path, window.location.origin).href

export async function solveCap() {
  if (!solver) {
    const [{ default: wasmUrl }, { default: hashwxUrl }, { default: pakoUrl }] = await Promise.all([
      import('@cap.js/wasm/browser/cap_wasm_bg.wasm?url'),
      import('@cap.js/wasm/browser/hashwx.wasm?url'),
      import('pako/dist/pako_inflate.min.js?url'),
    ])

    window.CAP_CUSTOM_WASM_URL = absolute(wasmUrl)
    window.CAP_CUSTOM_HASHWX_URL = absolute(hashwxUrl)
    window.CAP_PAKO_URL = absolute(pakoUrl)

    const { default: Cap } = await import('@cap.js/widget')
    const cap = new Cap({ apiEndpoint: '/api/cap/' })
    solver = () => cap.solve()
  }

  return (await solver()).token
}

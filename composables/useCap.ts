let solver: (() => Promise<{ token: string }>) | null = null

export async function solveCap() {
  if (!solver) {
    const [{ default: Cap }, { default: wasmUrl }, { default: hashwxUrl }] = await Promise.all([
      import('@cap.js/widget'),
      import('@cap.js/wasm/browser/cap_wasm_bg.wasm?url'),
      import('@cap.js/wasm/browser/hashwx.wasm?url'),
    ])

    window.CAP_CUSTOM_WASM_URL = wasmUrl
    window.CAP_CUSTOM_HASHWX_URL = hashwxUrl

    const cap = new Cap({ apiEndpoint: '/api/cap/' })
    solver = () => cap.solve()
  }

  return (await solver()).token
}

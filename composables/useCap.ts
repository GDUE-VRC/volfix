let solver: (() => Promise<{ token: string }>) | null = null

export async function solveCap() {
  if (!solver) {
    const [{ default: Cap }, { default: wasmUrl }] = await Promise.all([
      import('@cap.js/widget'),
      import('@cap.js/wasm/browser/cap_wasm_bg.wasm?url'),
    ])

    window.CAP_CUSTOM_WASM_URL = wasmUrl

    const cap = new Cap({ apiEndpoint: '/api/cap/' })
    solver = () => cap.solve()
  }

  return (await solver()).token
}

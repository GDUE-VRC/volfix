let solver: (() => Promise<{ token: string }>) | null = null

export async function solveCap() {
  if (!solver) {
    const { default: Cap } = await import('@cap.js/widget')
    const cap = new Cap({ apiEndpoint: '/api/cap/' })
    solver = () => cap.solve()
  }

  return (await solver()).token
}

import { nextTestSetup } from 'e2e-utils'

describe('vary-header', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  it('should keep a `Vary` from next.config.js alongside the router headers', async () => {
    const res = await next.fetch('/')
    expect(res.status).toBe(200)

    const vary = res.headers.get('vary')
    const fields = vary.split(',').map((field) => field.trim().toLowerCase())

    expect(fields).toContain('x-foo')
    expect(fields).toContain('rsc')
    expect(fields).toContain('next-router-state-tree')
    expect(fields).toContain('next-router-prefetch')
  })
})

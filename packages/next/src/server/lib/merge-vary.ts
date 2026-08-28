/**
 * Merges `Vary` header values into a single field-name list.
 *
 * Next.js has to add its own fields (`RSC`, `Next-Router-State-Tree`, ...) to
 * the `Vary` header of an App Router response, but an application is free to
 * add its own through `headers` in `next.config.js` or from middleware. Both
 * have to survive, otherwise a CDN either stops splitting the cache on the RSC
 * headers or stops splitting it on the application's own header.
 *
 * Field names are case-insensitive, so duplicates are dropped
 * case-insensitively while the first spelling and the original order are kept.
 * A `*` absorbs every other field, as it already means "varies on everything".
 */
export function mergeVary(
  ...values: Array<string | number | string[] | undefined | null>
): string {
  const fields: string[] = []
  const seen = new Set<string>()

  for (const value of values) {
    if (value === undefined || value === null) continue

    const parts = (Array.isArray(value) ? value : [String(value)]).flatMap(
      (part) => String(part).split(',')
    )

    for (const part of parts) {
      const field = part.trim()
      if (!field) continue
      if (field === '*') return '*'

      const key = field.toLowerCase()
      if (seen.has(key)) continue

      seen.add(key)
      fields.push(field)
    }
  }

  return fields.join(', ')
}

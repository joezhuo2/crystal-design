export type CommandItem = {
  id: string
  label: string
  hint?: string
  group?: string
  keywords?: string[]
  onSelect: () => void
}

export function filterItems(items: CommandItem[], query: string) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
  const matches = items.filter((item) => {
    const haystack = [item.label, item.group, ...(item.keywords ?? [])].join(' ').toLowerCase()
    return tokens.every((token) => haystack.includes(token))
  })
  const order = [...new Set(matches.map((item) => item.group ?? ''))]
  return order.flatMap((group) => matches.filter((item) => (item.group ?? '') === group))
}
